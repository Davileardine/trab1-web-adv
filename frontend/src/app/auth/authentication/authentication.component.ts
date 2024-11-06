import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {

}
