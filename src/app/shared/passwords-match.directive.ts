import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {passwordMatch} from './validators';

@Directive({
  selector: '[appPasswordsMatch][ngModelGroup]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordsMatchDirective,
      multi: true
    }
  ]
})
export class PasswordsMatchDirective implements  Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    return passwordMatch(control);
  }
}
