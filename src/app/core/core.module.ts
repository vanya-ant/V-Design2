import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  exports: [
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    RouterModule
  ]
})
export class CoreModule { }
