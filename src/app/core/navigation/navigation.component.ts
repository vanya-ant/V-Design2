
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/compat/app';
import User = firebase.User;
import {Router} from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: false
})
export class NavigationComponent implements OnInit {
  user: User;
  activeUserAdmin: User;

  constructor(private auth: AuthService, public translate: TranslateService,  private router: Router) {
    translate.addLangs(['en', 'bg']);
    translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|bg/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  switchLang(lang: string) {

    this.translate.getTranslation(lang);
    this.translate.use(lang);
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['home']));
  }

  get activeUser() {
    return this.auth.activeUser;
  }

  isAdmin() {
    return this.auth.isAdmin;
  }

  isActiveUserAdmin(){
    return this.auth.isAuthenticated() && this.isAdmin();
  }
}
