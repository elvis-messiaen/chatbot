import { Component, OnInit, OnDestroy, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Message} from '../../core/models/interfaces/Message';
import {ChatService} from '../../core/services/ChatService';
import {HeaderComponent} from '../../layout/header/header.component';

@Component({
  selector: 'app-admin-message',
  standalone: true,
  templateUrl: './admin-message.component.html',
  imports: [CommonModule, FormsModule, HeaderComponent],
})
export class AdminMessageComponent implements OnInit, OnDestroy {
  listMessage: Message [] = []
  messageSubscription!: Subscription;

  @ViewChild("content") content: ElementRef<HTMLInputElement> | undefined

  constructor(private chatService: ChatService) {
  }
  ngOnInit() : void {
    this.listenMessage()
  }

  sendMessage(content: string): void {
    let message : Message = { id: 0, message: content, date : new Date() }
    this.content!.nativeElement.value = ""
    this.chatService.send(message)
  }

  listenMessage(): void {
    this.messageSubscription = this.chatService.getCurentContent().subscribe((messages: Array<Message>) => {
      this.listMessage = messages.map((message: Message) => ({
        ...message
      }))
    })
    this.chatService.listen()
  }

  ngOnDestroy() {
    if(this.messageSubscription) {
      this.messageSubscription.unsubscribe()
    }
  }
}
