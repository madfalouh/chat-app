import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SignupComponent } from './views/signup/signup.component';

@NgModule({
    declarations: [
        AppComponent ,
        LoginComponent ,
        SignupComponent
    ],
    imports: [
        RouterOutlet,
        RouterLink, ReactiveFormsModule,
        BrowserModule,
        CommonModule,
        RouterModule.forRoot(routes) ,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
