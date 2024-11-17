import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SignupComponent } from './views/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionService } from './services/connection.service';
import { HomeComponent } from './views/home/home.component';

@NgModule({
    declarations: [
        AppComponent ,
        LoginComponent ,
        SignupComponent ,
        HomeComponent
    ],
    imports: [
        RouterOutlet,
        RouterLink, ReactiveFormsModule,
        BrowserModule,
        CommonModule,
        HttpClientModule ,
        RouterModule.forRoot(routes) ,
    ],
    providers: [ConnectionService],
    bootstrap: [AppComponent],
})
export class AppModule { }
