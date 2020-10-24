import firebase from 'firebase';

export interface Roles{
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User extends firebase.User {
  uid: string;
  email: string;
  roles: Roles;
}
