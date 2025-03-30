import {adminEmail} from '../../assets/admin';

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
    if (this.email === adminEmail) {
      this.role = 'admin';
      return;
    }
    this.role = 'user';
  }
}
