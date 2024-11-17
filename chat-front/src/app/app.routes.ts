import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path : "",
        redirectTo : "login",
        pathMatch : "full",
    },
    {
        path : "login",
        pathMatch : "full",
        component : LoginComponent,
        canActivate : [authGuard]
    },
    {
        path : "signup",
        pathMatch : "full",
        component : SignupComponent, 
        canActivate : [authGuard]
    },
    {
        path : "home",
        pathMatch : "full",
        component : HomeComponent,
        canActivate : [authGuard]
    },

];
