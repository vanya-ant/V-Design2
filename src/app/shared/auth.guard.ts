import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, UrlTree
} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable, observable} from 'rxjs';
import {map, take } from 'rxjs/operators';
import * as _ from 'lodash';
import {AuthService} from './services/auth.service';
import {ignoreDiagnostics} from '@angular/compiler-cli/src/ngtsc/typecheck/src/diagnostics';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public db: AngularFireDatabase,
    public router: Router,
    private toastr: ToastrService
  ) { }
/*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.activeUser
      .take(1)
      .map(user => _.has(_.get(user, 'roles'), 'admin'))
      .do(authorized => {
        if (!authorized) {
          console.log('route prevented!');
          //  this.router.navigate(['/']);
        }
      });
  }*/
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const active = this.auth.activeUser;
    if (active) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('Please, sign in with the correct credentials!');
      return false;
    }
  }
}
