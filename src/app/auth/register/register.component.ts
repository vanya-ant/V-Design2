import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {passwordMatch} from '../../shared/validators';
import firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private password: string;
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
    const database = firebase.database();
    const registerObj = this.registerForm.value;
    const currentPass = this.registerForm.value.passwords.password;
    delete this.registerForm.value.passwords;
    await this.auth.register(registerObj.username, currentPass);
  }

  async logout() {
    await this.auth.logout();
  }
}
