import { Component, Injectable, OnInit } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../header/header.component"; // Ajuste o caminho conforme necessário
import { ChatService } from "./listchat.service"; // Ajuste o caminho conforme necessário


interface Chat {
  name: string;
  _id: string;
  participants: string[]; // ou outros campos necessários, como 'name'
}

@Component({
  selector: 'message-list',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './messagelist.html',
})

@Injectable({
  providedIn: 'root', // Isso indica que o serviço será injetado globalmente na aplicação
})
export class MessageListComponent implements OnInit {
  chats: Chat[] = [];  // Variável que armazenará os chats

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getChats().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.chats = response.data;
        } else {
          this.chats = [];
        }
      },
      (error) => {
        console.error('Erro ao buscar chats:', error);
        this.chats = [];
      }
    );
  }
}
