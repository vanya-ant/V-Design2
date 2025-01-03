import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  exports: [
    NavigationComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
  ]
})
export class CoreModule { }
