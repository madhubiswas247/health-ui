import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailid: ['', Validators.required],
      password: ['', Validators.required]
 });
  }

  register() {
    this.router.navigate(["register"])
  }

}
