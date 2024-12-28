import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: false
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
              private auth: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async forgotPassword() {
    await this.auth.resetPassword(this.forgotPasswordForm.value.username);
  }
}
