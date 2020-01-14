import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.logout();
  }
  login() {
    this.model.action = 'home';
    this.authService.loginForm(this.model).subscribe(response => {
      console.log(typeof(response))
      if (response.length !== null) {
        this.router.navigate(['/users']);
      }
      else 
      alert("please check email or passs")
    }, error => {
      console.error(error);
    });
  }

}
