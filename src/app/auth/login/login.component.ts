import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
              private auth: AuthService,
              private router: Router,
              public toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.auth.activeUser != null) {
      this.auth.logout();
    }
  }

  async login() {
    await this.auth.login(this.loginForm.value.username, this.loginForm.value.password);
  }
}
