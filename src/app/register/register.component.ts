import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import { User } from './user';
import { RegisterService } from './services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerService:RegisterService 
  errorMessage: string;
  successMessage:string
  constructor(private formBuilder: FormBuilder,
     @Inject(RegisterService) registerService:RegisterService ) {
       this.registerService = registerService;
      }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ["",[ Validators.required, this.validateName]],
      lastname: ["", [Validators.required, this.validateName]],
      emailid: ["",[ Validators.required, this.validateEmail]],
      password: ["", [Validators.required, this.validatePassword]],
      phone: ["", [Validators.required, this.validatePhone]],
      status: ["", Validators.required],
 });
  }

  register() {
    this.errorMessage = '';
    this.successMessage = '';
    let user = new User();
    user.firstname = this.registerForm.value.firstname;
    user.lastname =  this.registerForm.value.lastname;
    user.password =  this.registerForm.value.password;
    user.emailid =  this.registerForm.value.emailid;
    user.phone =  this.registerForm.value.phone;
    user.status =  this.registerForm.value.status;
    this.registerService.getUser( user.emailid).subscribe((data:User) => {
      if(!data) {
   this.registerService.registerUser(user).subscribe((data) => {
   this.successMessage = 'User is saved successfully.';
    },
    err=>{
          this.errorMessage = err.error.message;
    })
      }  else {
        this.errorMessage = "User is already registered with us."
      }
       },
       err=>{
             this.errorMessage = err.error.message;
       })
 
  }

  validatePhone(c: FormControl) {
    let PHONE_REGEXP = /[^a-zA-Z]\d{10}/;
    if(c.value.length >0) {
    return PHONE_REGEXP.test(c.value) ? null : {
      phoneError: {
          message: "Enter 10 digit phone number."
      }
  };
} else {
  return  {phoneError: {
        message: "Phone number is required."
    }
};
}
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

validateName(c: FormControl) {
  let PHONE_REGEXP =/(^[^0-9\*&^%$#@!~_+=/?><:;,"[}{\]()|]*[a-z\.']){1,10}$/;
  if(c.value.length >0 ) {
    return PHONE_REGEXP.test(c.value) ? null : {
      nameError: {
          message: "Name is invalid."
      }
  };
  }else {
    return {
      nameError: {
           message: "Name is required."
       }
   };
   }
}

validatePassword(c: FormControl) {
  let PASSWORD_REGEXP = /^[a-zA-Z_0-9\W]{3,14}$/;
  if(c.value.length >0 ) {
  return PASSWORD_REGEXP.test(c.value) ? null : {
      passwordError: {
          message: "Password should be 3 to 14 characters long."
      }
  };
} else {
 return {
    passwordError: {
        message: "Password is required."
    }
};
}
}


}
