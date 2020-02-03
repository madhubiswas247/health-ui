import { Component } from '@angular/core';
import { User } from './register/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'evolent-health';
  loggedUser:User;

  constructor(private router:Router) {
     }

  ngDoCheck() {
    this.loggedUser = new User();
    this.loggedUser.emailid = sessionStorage.getItem('emailid');
  }

  logout() {
    sessionStorage.clear();
    this.loggedUser = null;
    this.router.navigate(["/"])
  }
}
