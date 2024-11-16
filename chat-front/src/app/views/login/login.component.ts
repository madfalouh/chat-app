import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../formStyle.css'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;

  constructor(private formBuiler: FormBuilder) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {

    this.loginForm = this.formBuiler.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
    this.loginForm.controls['username'].valueChanges.subscribe(() => {
      this.clearIncorrectErrors('username');
    })

    this.loginForm.controls['password'].valueChanges.subscribe(() => {
      this.clearIncorrectErrors('password');
    })

  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && control.dirty;
  }

  clearIncorrectErrors(field: string): void {
    const control = this.loginForm.get(field);
    if (control?.invalid && control?.dirty) {
      control.setErrors(null);
    }
  }

  login() {

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log("credentials :", username, password)
    }
  }
}
