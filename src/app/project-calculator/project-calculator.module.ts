import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCalculatorComponent } from './project-calculator/project-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [ProjectCalculatorComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
    ]
})
export class ProjectCalculatorModule { }
