import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: '../formStyle.css'
})
export class SignupComponent implements OnInit {
  signupForm! : FormGroup;
  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username : new FormControl(null),
        password : new FormControl(null),
        passwordConfirm : new FormControl(null)
      }
    )
  }
  signup() {
    if (this.signupForm) {
      const { username, password , passwordConfirm } = this.signupForm.value;
      if (password === passwordConfirm) {
        console.log("credentials :" , username, password)
      } else {
        console.log("Passwords should match")
      }
    }
  }
}