import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import {CollectionReference} from '@angular/fire/firestore';
import {environment} from '../../../environments/environment';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import User = firebase.User;
import { adminEmail } from 'src/assets/admin';

const baseUrl = 'https://v-design-5.firebaseio.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  isAdmin = false;
  token: string;
  userStatus: string;
  private adminEmail = adminEmail;

  usersCollection;

  constructor(private afAuth: AngularFireAuth,
              public  router: Router,
              public toastr: ToastrService,
              private http: HttpClient,
              private db: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
    this.usersCollection = db.collection<User>('users').ref;
  }

  getCollection() {
    return this.usersCollection.get();
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password)
        .then(data => { if (!data.user.emailVerified) {
          this.toastr.error('Please, verify your email!');
          this.afAuth.signOut();
          } else {
          this.isAdmin = email === this.adminEmail;
          this.router.navigate(['projects-portfolio']);
          this.toastr.success('Successfully logged in!');
        }
      });
    } catch (error) {
      this.toastr.error(error.message);
    }
  }

  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(data => data.user.sendEmailVerification());
      this.toastr.info('Email verification link was sent to your email address');
      await this.afAuth.signOut();
      await this.router.navigate(['projects-portfolio']);
    } catch (error) {
      console.log(error.message);
      this.toastr.error('Error');
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.clear();
      await this.router.navigate(['']);
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

  get checkAuthorization(): boolean {
    if (!this.user) { return false; }
    return !!this.activeUser.isAuthenticated().isAdmin();
  }

  getById(id: string) {
    return this.http.get<User>(`${baseUrl}/${id}/.json`);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
        });
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
