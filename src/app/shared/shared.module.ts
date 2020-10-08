import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordsMatchDirective } from './passwords-match.directive';



@NgModule({
  declarations: [PasswordsMatchDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
