import {Injectable, OnDestroy} from '@angular/core';
import {Stomp, CompatClient} from '@stomp/stompjs';
import {BehaviorSubject, Observable} from 'rxjs';
import {Message} from '../models/interfaces/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private connexion: CompatClient;
  private contents: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  private connected: boolean = false;
  private userId: string;

  constructor() {
    this.userId = window.location.pathname.includes('admin') ? 'admin' : 'user';
    this.connexion = Stomp.client('ws://localhost:8080/websocket');
    this.connect();
  }

  private connect(): void {
    this.connexion.connect({},
      () => {
        this.connected = true;
        console.log('Connected to WebSocket');
        this.setupSubscriptions();
        this.requestMissedMessages();
      },
      (error: any) => {
        console.error('WebSocket connection error:', error);
        setTimeout(() => {
          console.log('Attempting to reconnect...');
          this.connect();
        }, 5000);
      }
    );
  }

  private setupSubscriptions(): void {
    if (this.connected) {
      this.connexion.subscribe('/topic/sendMessage', message => {
        this.handleNewMessage(message);
      });

      this.connexion.subscribe(`/user/${this.userId}/topic/missedMessages`, message => {
        this.handleNewMessage(message);
      });
    }
  }

  private handleNewMessage(message: any): void {
    console.log('Received message:', message);
    const currentContent = this.contents.getValue();
    const parsedMessage = JSON.parse(message.body);
    currentContent.push(parsedMessage);
    this.contents.next(currentContent);
  }

  private requestMissedMessages(): void {
    if (this.connected) {
      this.connexion.send('/app/getMissedMessages', {}, this.userId);
    }
  }

  public send(message: Message): void {
    if (this.connected) {
      console.log('Sending message:', message);
      this.connexion.send('/app/newMessage', {}, JSON.stringify(message));
    } else {
      console.warn('Cannot send message: not connected');
    }
  }

  public getCurentContent(): Observable<Message[]> {
    return this.contents.asObservable();
  }

  ngOnDestroy(): void {
    if (this.connected) {
      this.connexion.disconnect();
    }
  }
}
