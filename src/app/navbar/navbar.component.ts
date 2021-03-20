import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private authservice: AuthService) { }

  onLogin() {
    console.log("login...")
    this.authservice.login();
  }
}
