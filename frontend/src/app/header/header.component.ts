import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthServices} from "../auth/auth.services";
import {LogoutComponent} from "../auth/logout/logout.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LogoutComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthServices);
  user = this.authService.user();
}
