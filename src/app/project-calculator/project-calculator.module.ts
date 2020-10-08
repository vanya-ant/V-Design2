import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCalculatorComponent } from './project-calculator/project-calculator.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ProjectCalculatorComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class ProjectCalculatorModule { }
