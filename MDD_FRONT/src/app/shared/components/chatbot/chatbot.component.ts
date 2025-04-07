import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Message} from '../../../core/models/interfaces/Message';
import {ChatService} from '../../../core/services/ChatService';
import {HeaderComponent} from '../../../layout/header/header.component';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  templateUrl: './chatbot.component.html',
  imports: [CommonModule, FormsModule, HeaderComponent],
})
export class ChatbotComponent implements OnInit, OnDestroy {
  listMessage: Message[] = [];
  messageSubscription!: Subscription;
  @ViewChild("content") content: ElementRef<HTMLInputElement> | undefined;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messageSubscription = this.chatService.getCurentContent()
      .subscribe((messages: Message[]) => {
        this.listMessage = [...messages];
      });
  }

  sendMessage(content: string): void {
    if (content.trim()) {
      const message: Message = {
        id: 1,
        message: content,
        date: new Date()
      };
      this.chatService.send(message);
      if (this.content) {
        this.content.nativeElement.value = "";
      }
    }
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
