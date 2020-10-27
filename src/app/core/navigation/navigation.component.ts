
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'firebase';
import {ignoreDiagnostics} from "@angular/compiler-cli/src/ngtsc/typecheck/src/diagnostics";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService, public translate: TranslateService) {
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
    this.auth.logout();
  }

  get activeUser() {
    return this.auth.activeUser;
  }

  isAdmin() {
    // return true;
    return this.auth.isAdmin;
  }
}
