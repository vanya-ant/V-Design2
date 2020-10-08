import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactsComponent } from '../contacts/contacts/contacts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ContactsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AuthModule { }
