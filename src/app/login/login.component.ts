import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../register/user';
import { RegisterService } from '../register/services/register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerService:RegisterService 
  errorMessage: string;
  successMessage:string
  constructor(private formBuilder: FormBuilder,private router:Router,
    @Inject(RegisterService) registerService:RegisterService) {
      this.registerService = registerService;
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailid: ['', [Validators.required, this.validateEmail]],
      password: ['', Validators.required]
 });
  }

  registerHere() {
    this.router.navigate(["register"])
  }

  login() {
    let emailid =  this.loginForm.value.emailid;
    let password =  this.loginForm.value.password;
    this.registerService.getUserByEmailAndPassword(emailid, password).subscribe((data:User) => {
      if(!data) {
        this.errorMessage = "Wrong password or you are not registered with us."
        sessionStorage.clear();
      } else {
        sessionStorage.setItem('emailid',data.emailid)
        this.router.navigate(["dashboard"])
      }
    })
  }

  validateEmail(c: FormControl) {
    let EMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(c.value.length >0 ) {
    return EMAIL_REGEXP.test(c.value) ? null : {
        emailError: {
            message: "Email is invalid."
        }
    };
  } else {
   return {
      emailError: {
          message: "Email is required."
      }
  };
  }
}
}
