import firebase from 'firebase';

export interface Roles{
  admin?: boolean;
}

// @ts-ignore
export class User implements firebase.User {
  uid: string;
  email: string;
  role: string;

  constructor(uid: string, email: string, username: string, imageUrl: string){
    this.uid = uid;
    this.email = email;
    this.role = 'user';
  }
}
