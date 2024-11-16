import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';

export const routes: Routes = [
    {
        path : "",
        redirectTo : "login",
        pathMatch : "full",

// add guard
    },
    {
        path : "login",
        pathMatch : "full",
        component : LoginComponent
    },
    {
        path : "signup",
        pathMatch : "full",
        component : SignupComponent
    },
];
