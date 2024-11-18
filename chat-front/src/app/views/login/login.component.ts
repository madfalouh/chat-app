import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../../services/connection.service';
import { User } from '../../models/user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../formStyle.css'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;

  constructor(private formBuiler: FormBuilder ,  
    private loginService: ConnectionService, 
    private userService :UserService, 
    private router: Router) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {

    this.loginForm = this.formBuiler.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(4)] ),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    } , {updateOn : "submit"})
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.dirty && control.invalid ;
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);

    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return "Minimum length is " + minLength;
    }
    return '';
  }
  
  login() {
    this.loginForm.controls['password']?.markAsDirty();
    this.loginForm.controls['username']?.markAsDirty();

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log("credentials :", username, password)

      this.loginService.login({ username, password }).subscribe((res: User) => {
        console.log(res);
        if (res) {
          if (res.id) {
            sessionStorage.setItem("id",res.id)
            this.userService.setUserId(res.id)
          }
          this.router.navigate(["/home"])
        } else {
          console.log("ser t7wa");
        }
      })

    }
  }
}
