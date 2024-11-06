import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {MessagesComponent} from "./messages/messages.component";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessagesComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {}
