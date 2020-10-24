import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordsMatchDirective } from './passwords-match.directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PasswordsMatchDirective],
  imports: [
    CommonModule
  ],
  exports: [
    TranslateModule
  ]
})
export class SharedModule { }
