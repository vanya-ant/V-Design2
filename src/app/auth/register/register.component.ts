import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {passwordMatch} from "../../shared/validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              public toastr: ToastrService) {
    this.registerForm = fb.group({
      username: ['', [Validators.required, Validators.email]],
      role: ['Customer', Validators.required],
      passwords: fb.group({
        password: ['', Validators.required],
        repeatPassword: ['', Validators.required]
      }, { validators: [passwordMatch] }),
    });
  }

  ngOnInit() {
    if (this.auth.activeUser) {
      this.logout();
    }
  }

  async register() {
    const registerObj = this.registerForm.value;
    registerObj.password = registerObj.passwords.password;
    delete registerObj.passwords;
    try {
      await this.auth.register(registerObj.email, registerObj.password);
      await this.router.navigate(['projects-portfolio']);
      this.toastr.success('Successfully registered');
    } catch (error) {
      this.toastr.error('Error');
    }
  }

  async logout() {
    try {
      await this.auth.logout();
      localStorage.clear();
      this.toastr.success('Successfully logged out');
    } catch (error) {
      this.toastr.error('Error');
    }
  }
}
