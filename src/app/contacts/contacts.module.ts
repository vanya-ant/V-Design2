import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './contacts/contacts.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
  ]
})
export class ContactsModule { }
