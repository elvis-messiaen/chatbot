import {Injectable, OnDestroy} from '@angular/core';
import {Stomp, CompatClient, StompSubscription} from '@stomp/stompjs';
import {BehaviorSubject} from 'rxjs';
import {Message} from '../models/interfaces/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private subscription: StompSubscription | undefined
  private connexion: CompatClient | undefined = undefined
  private contents: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([])

  constructor() {
    this.connexion = Stomp.client('ws://localhost:8080/websocket')
    this.connexion.connect({}, () => {})
  }
  public send(message: Message): void {
    if(this.connexion && this.connexion.connected) {
      this.connexion.send('/app/newMessage', {}, JSON.stringify(message))
    }
  }

  public listen(): void{
    if(this.connexion) {
      this.connexion.connect({}, () => {
        this.subscription = this.connexion!.subscribe('/topic/sendMessage', message => {
          const currentContent = this.contents.getValue()
          currentContent.push(JSON.parse(message.body))
          this.contents.next(currentContent)
        })
      })
    }
  }

  getCurentContent() {
    return this.contents.asObservable()
  }

  ngOnDestroy(): void{
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
