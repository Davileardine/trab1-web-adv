import { FormsModule, NgForm } from "@angular/forms";
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MessageService } from "../message.services";
import { Message } from "../message.model";
import { AuthServices } from "../../auth/auth.services";
import { ChatComponent } from "../chat/chat.component";
import { User } from "../../auth/user.model";
import $ from "jquery";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule, ChatComponent],
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
 

  messageContent: string = '';
  messageId: any = null;
  chatId: string = ''; // Mantenha o chatId aqui

  private messageService = inject(MessageService);
  private authService = inject(AuthServices);
  private user = this.authService.user();
  
  constructor(
    private route: ActivatedRoute
  ) {}

  onSubmit(form: NgForm) {
    if (!this.chatId) {
      console.error('Erro: chatId não fornecido.');
      return;
    }

    const user = new User(
      this.user.name,
      this.user.email,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      this.user._id
    );

    const messageAux = new Message(form.value.content, user, form.value._id ?? undefined);

    if (form.value._id) {
      this.messageService.editMessage(form.value.content, form.value._id, this.chatId).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.messageService.addMessage(messageAux, this.chatId).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    form.resetForm();
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      
      this.chatId = params['id']|| '';
    });

    $(document).on('edit', (event, message) => {
      this.messageId = message._id;
      this.messageContent = message.content;
      
    });
  }
}
