import { Component, OnInit, Inject } from '@angular/core';
import { RegisterService } from '../register/services/register.service';
import { User } from '../register/user';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  successMessage:string
  registerService:RegisterService 
  contacts= new Array<User>();
  listContact:boolean
  addcontact: boolean;
  editcontact:boolean;
  editForm:boolean;
  registerForm: FormGroup;
  editContactForm: FormGroup;
  selectedUser: User;
  inactivecontact:boolean;
  inactiveForm: FormGroup;
  constructor(private formBuilder: FormBuilder,@Inject(RegisterService) registerService:RegisterService) {
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
 this.editContactForm = this.formBuilder.group({
  firstname: ["",[ Validators.required, this.validateName]],
  lastname: ["", [Validators.required, this.validateName]],
  emailid: ["",[ Validators.required, this.validateEmail]],
  password: ["", [Validators.required, this.validatePassword]],
  phone: ["", [Validators.required, this.validatePhone]],
  status: ["", Validators.required],
});

this.inactiveForm = this.formBuilder.group({
  emailid: ["",[ Validators.required, this.validateEmail]],
  status: ["", Validators.required],
});


  }

  getAllContacts() {
    this.registerService.getAllContacts().subscribe((data:User[]) => {
      if(!data) {
      } else {
       this.contacts = data;
  
       this.listContact = true;
       this.addcontact = false;
      this.editcontact= false;
       this.editForm= false;
       this.inactivecontact = false;
      }
    })
  }

  addContact() {
 this.addcontact = true;
 this.listContact = false;
this.editcontact= false;
 this.editForm= false;
 this.inactivecontact = false;
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
   this.registerForm = this.formBuilder.group({
    firstname: "",
    lastname: "", 
    emailid: "",
    password: "", 
    phone: "", 
    status: ""
});
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
    if(c.value.length >0 && c.value.length<10 && typeof(c.value)) {
    return PHONE_REGEXP.test(c.value) ? null : {
      phoneError: {
          message: "Enter 10 digit phone number."
      }
  };
} else if(c.value.length == 0) {
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
  let PHONE_REGEXP =/(^[^0-9\*&^%$#@!~_+=/?><:;,"[}{\]()|]*[a-zA-Z\.']){1,10}$/;
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
  let PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if(c.value.length >0 ) {
  return PASSWORD_REGEXP.test(c.value) ? null : {
      passwordError: {
          message: "Password should be at least 8 characters long.Use at least 1 uppercase,1 lowercase,1 digit and 1 special character(!,@,#,$,%,^,&,*)."
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

editContact() {

 this.editcontact = true;
 this.addcontact = false;
 this.listContact = false;
 this.editForm= false;
 this.inactivecontact = false;
 this.selectedUser = new User();
 this.contacts = [];
 this.editContactForm.setValue({
  emailid: "", 
  firstname: "",
  lastname: "",
  password: "",
  phone: "",
  status: "",
});
 this.registerService.getAllContacts().subscribe((data:User[]) => {
   this.contacts = data;
   
})

}

showEditForm() {
  this.editForm = true;
  this.editcontact = true;
  this.addcontact = false;
 this.listContact = false;
 this.inactivecontact = false;
  let email = this.editContactForm.get('emailid').value;
  this.selectedUser= new User();
  this.registerService.getUser(email).subscribe((data:User) => {
    this.selectedUser = data;
  });
}

showStatus() {
  let email = this.inactiveForm.get('emailid').value;
  this.registerService.getUser(email).subscribe((data:User) => {
    this.selectedUser = data;
 
  });
}
edit() {
  let user = new User();
  user.firstname = this.editContactForm.value.firstname ||   this.selectedUser.firstname;
  user.lastname =  this.editContactForm.value.lastname ||   this.selectedUser.lastname;
  user.password =  this.editContactForm.value.password ||   this.selectedUser.password;
  user.emailid =  this.editContactForm.value.emailid ||   this.selectedUser.emailid;
  user.phone =  this.editContactForm.value.phone ||   this.selectedUser.phone;
  user.status =  this.editContactForm.value.status ||   this.selectedUser.status;
  this.registerService.editContact(user).subscribe((data) => {
    this.successMessage= data.message;
    this.editContactForm.setValue({
      emailid: "", 
      firstname: "",
      lastname: "",
      password: "",
      phone: "",
      status: "",
    });
  });
}

deleteUser() {
  let user = new User();
  user.firstname =    this.selectedUser.firstname;
  user.lastname =    this.selectedUser.lastname;
  user.password =    this.selectedUser.password;
  user.emailid =  this.inactiveForm.value.emailid ||   this.selectedUser.emailid;
  user.phone =   this.selectedUser.phone;
  user.status =  this.inactiveForm.value.status ||   this.selectedUser.status;
  this.registerService.deleteContact(user).subscribe((data) => {
    this.successMessage= data.message;
  });
}

inactiveContact() {
  this.inactivecontact = true;
  this.editcontact = false;
  this.addcontact = false;
  this.listContact = false;
  this.editForm= false;
  this.selectedUser = new User();
  this.contacts = [];
  this.inactiveForm.setValue({
    emailid: "", 
    status: "",
  });
  this.registerService.getAllContacts().subscribe((data:User[]) => {
    this.contacts = data;
 })
}

}
