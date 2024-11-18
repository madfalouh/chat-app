import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
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

    passwordMatchValidator(g: FormGroup) {
      return g.get('password')?.value === g.get('passwordConfirm')?.value
         ? null : {'mismatch': true};
   }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(4)])
      } , {
        updateOn: 'submit',
        validators: this.passwordMatchValidator
      } as AbstractControlOptions
    )

    
  }

  isFieldInvalid(field: string): boolean {
    const control = this.signupForm.get(field);
    return !!control && control.dirty && control.invalid ;
  }

  getErrorMessage(field: string): string {
    const control = this.signupForm.get(field);

    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return "Minimum length is " + minLength;
    }
    if (field === 'passwordConfirm' && this.signupForm.hasError('mismatch')) {
      return 'Passwords do not match.';
    }
    return '';
  }

  signup() {
    this.signupForm.controls['username']?.markAsDirty();
    this.signupForm.controls['password']?.markAsDirty();
    this.signupForm.controls['passwordConfirm']?.markAsDirty();

    if (this.signupForm.valid) {
      const { username, password, passwordConfirm } = this.signupForm.value;
      if (password === passwordConfirm) {

        this.signUpService.signUp({ username, password }).subscribe((res: User) => {
          console.log(res);
          if (res) {
            this.router.navigate(["/login"])
            alert("Accounted created !!")
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
