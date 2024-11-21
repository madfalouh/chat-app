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
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FriendRequestModalComponent } from './modals/friend-request-modal/friend-request-modal.component';
@NgModule({
    declarations: [
        AppComponent ,
        LoginComponent ,
        SignupComponent ,
        HomeComponent ,
    FriendRequestModalComponent ,  
    ],
    imports: [
        RouterOutlet,
        RouterLink, ReactiveFormsModule,
        BrowserModule,
        CommonModule,
        HttpClientModule ,
        RouterModule.forRoot(routes) ,
        BrowserAnimationsModule, // Required for Angular Material
        MatIconModule  
    ],
    providers: [ConnectionService],
    bootstrap: [AppComponent],
})
export class AppModule { }
