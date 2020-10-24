import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import {AuthGuard} from '../shared/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {ProjectCreateComponent} from '../project/project-create/project-create.component';
import {ProjectModule} from '../project/project.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthGuard]
    , children: [
      {path: 'project-create', component: ProjectCreateComponent},
    ]
  },
];


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProjectModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
