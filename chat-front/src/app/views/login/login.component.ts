import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: '../formStyle.css'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username : new FormControl(null),
        password : new FormControl(null)
      }
    )
  }
  login() {
    if (this.loginForm) {
      const { username, password } = this.loginForm.value;
      console.log("credentials :" , username, password)
    }
  }
}
