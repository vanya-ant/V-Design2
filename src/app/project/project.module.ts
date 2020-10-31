import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProjectCreateComponent, ProjectDetailsComponent, ProjectListComponent, ProjectPortfolioComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ProjectModule { }
