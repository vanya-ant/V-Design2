import { initializeApp } from 'firebase/app';
import {environment} from '../../environments/environment';
const firebase = initializeApp(environment.firebase);

export interface Roles{
  admin?: boolean;
}

// @ts-ignore
export class User implements firebase.User {
  uid: string;
  email: string;
  role: string;

  constructor(uid: string, email: string){
    this.uid = uid;
    this.email = email;
    this.role = 'user';
  }
}
