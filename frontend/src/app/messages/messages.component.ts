import {Component} from "@angular/core";
import {ChatComponent} from "./chat/chat.component";
import {InputComponent} from "./input/input.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ChatComponent, InputComponent, HeaderComponent],
  template: `
    <app-header/>
    <div class="container">
      <div class="card m-4">
        <div class="card-body scrollable" id="chat" style="height: 30rem">
          <app-message-chat/>
        </div>
        <div class="card-footer">
          <app-message-input/>
        </div>
      </div>
    </div>
  `,
})

export class MessagesComponent {}
