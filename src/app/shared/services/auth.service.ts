import { Injectable } from '@angular/core';
// @ts-ignore
import User from 'firebase';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  user: User;

  constructor(private afAuth: AngularFireAuth, public  router: Router, public toastr: ToastrService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.router.navigate(['projects-portfolio']);
      this.toastr.success('Successfully logged in!');
    } catch (error) {
      this.toastr.error('Error');
    }
  }

  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.router.navigate(['projects-portfolio']);
      this.toastr.success('Successfully registered!');
    } catch (error) {
      this.toastr.error('Error');
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/']);
      this.toastr.success('Successfully logged out!');
    } catch (error) {
      this.toastr.error('Error');
    }
  }

  async resetPassword(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      await this.router.navigate(['login']);
      this.toastr.success('Reset password email sent!');
    } catch (error) {
      this.toastr.error('Error');
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
  }

  get activeUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
