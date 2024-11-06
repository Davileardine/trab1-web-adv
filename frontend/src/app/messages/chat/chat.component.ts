import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.services';
import { DatePipe, NgClass } from "@angular/common";
import { AuthServices } from "../../auth/auth.services";
import { ActivatedRoute } from '@angular/router';
import { InputComponent } from "../input/input.component";
import $ from "jquery";
import {} from "@angular/router"

@Component({
  selector: 'app-message-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    DatePipe,
    CommonModule,
    InputComponent
  ],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private authService = inject(AuthServices);
  user = this.authService.user();
  
  
  chatId: string = '';
  
  private messageUpdateInterval: any;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Captura o chatId da URL e carrega as mensagens
    this.route.params.subscribe(params => {
      
      this.chatId = params['id']|| '';
      console.log("id chat comp", this.chatId);
      this.loadMessages(); 
      this.startMessageUpdate();  
    });

    // Atualiza a rolagem para o fundo da página quando novas mensagens são inseridas
    $('#chat').on('DOMNodeInserted', function () {
      $(this).animate({ scrollTop: 100000000 });
    });
  }

  ngOnDestroy(): void {
    // Limpar o intervalo quando o componente for destruído para evitar chamadas desnecessárias
    if (this.messageUpdateInterval) {
      clearInterval(this.messageUpdateInterval);
    }
  }

  loadMessages() {
    if (!this.chatId) {
      return;  // Se chatId não estiver definido, não faz a requisição
    }

    // Chama o serviço para carregar as mensagens do chat específico
    this.messageService.getMessages(this.chatId).subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  startMessageUpdate() {
    if (!this.chatId) {
      return;  // Se chatId não estiver definido, não inicia a atualização
    }

    // Atualiza as mensagens a cada 1 segundo
    this.messageUpdateInterval = setInterval(() => {
      this.messageService.getMessages(this.chatId).subscribe({
        next: (messages: Message[]) => {
          this.messages = messages;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }, 1000);  // Intervalo de 1 segundo para atualização
  }
  
  trackById(index: number, item: Message): string {
    return item._id || ''; 
  }

  onEdit(id: any) {
    const message = this.messages.find((message) => message._id === id);
    $(document).trigger('edit', message);
  }

  onDelete(id: any) {
    if (!this.chatId) {
      console.error("chatId não está definido para exclusão.");
      return;
    }

    this.messageService.deleteMessage(this.chatId, id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }
}
