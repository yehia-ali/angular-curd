import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { AddUserComponent } from './add-user/add-user.component';
import { NotfoundedComponent } from './notfounded/notfounded.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent, 
    UsersComponent,
    EditUserComponent,
    // AddUserComponent,
    NotfoundedComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
