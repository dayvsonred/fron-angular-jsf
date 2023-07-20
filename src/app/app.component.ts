import { Component } from '@angular/core';
//import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title?: string = "titulo";

  constructor(
  ) { }

  ngOnInit(): void {;

    if (this.isLoggedIn) {
    }
  }

  logout(): void {
    window.location.reload();
  }
}