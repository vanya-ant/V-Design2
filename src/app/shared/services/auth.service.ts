import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase, { User } from 'firebase';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore, CollectionReference} from '@angular/fire/firestore';
import * as admin from 'firebase-admin';

const baseUrl = 'https://v-design-5.firebaseio.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  isAdmin = false;
  token: string;
  userStatus: string;
  private users: User[] = [];

  usersCollection: CollectionReference;

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
/*    admin.auth().setCustomUserClaims('vXmTMhsNsCT2QjPrOhUdMaC1CeA2', {admin: true}).then(() => {
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
    });*/
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
      console.log(error.message);
      this.toastr.error('Error');
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
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

  get checkAuthorization(): boolean {
    if (!this.user) { return false; }
    return !!this.activeUser.isAuthenticated().isAdmin();
  }

  getById(id: string) {
    return this.http.get<User>(`${baseUrl}/${id}/.json`);
  }

  isAdminUser(id: string) {
    this.getById(id).subscribe(
      (data) => {
        // @ts-ignore
        this.isAdmin = data.role === 'admin';
      }
    );
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
