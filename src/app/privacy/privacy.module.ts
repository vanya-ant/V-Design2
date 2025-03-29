import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy/privacy.component';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class PrivacyModule { }
