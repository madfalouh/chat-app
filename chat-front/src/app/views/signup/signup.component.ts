import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ConnectionService } from '../../services/connection.service';
import { User } from '../../models/user.type';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: '../formStyle.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;


  constructor(
    private signUpService: ConnectionService, 
    private router: Router) { }


  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl(null),
        password: new FormControl(null),
        passwordConfirm: new FormControl(null)
      }
    )
  }
  signup() {
    if (this.signupForm) {
      const { username, password, passwordConfirm } = this.signupForm.value;
      if (password === passwordConfirm) {

        this.signUpService.signUp({ username, password }).subscribe((res: User) => {
          console.log(res);
          if (res) {
            this.router.navigate(["/login"])
          } else {
            console.log("ser t7wa");
          }
        })
      } else {
        console.log("Passwords should match")
      }
    }
  }
}
