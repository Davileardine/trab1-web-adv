import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.html',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class ChatCreateComponent {
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')}
  chatForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Cria o formulário com um campo para o nome do chat
    this.chatForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],  // Você pode adicionar mais campos, como descrição do chat
    });
  }

  // Função para criar o chat
  onSubmit() {
    if (this.chatForm.valid) {
      const newChat = this.chatForm.value;
      this.messageService.createChat(newChat).subscribe({
        next: (response) => {
          
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Erro ao criar chat', error);
        },
      });
    }
  }
}
