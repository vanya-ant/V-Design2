import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';



@NgModule({
  declarations: [ProjectCreateComponent, ProjectDetailsComponent, ProjectListComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectModule { }
