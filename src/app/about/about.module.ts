import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class AboutModule { }
