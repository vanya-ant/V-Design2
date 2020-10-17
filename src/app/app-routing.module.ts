import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home/home.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { ProjectCalculatorComponent } from './project-calculator/project-calculator/project-calculator.component';
import { AboutComponent } from './about/about/about.component';
import { PrivacyComponent } from './privacy/privacy/privacy.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { AuthGuard } from './shared/auth.guard';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: {
      isLogged: false
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
    data: {
      isLogged: false
    },
  },
  {
    path: 'project-calculator',
    component: ProjectCalculatorComponent,
    loadChildren: () => import('./project-calculator/project-calculator.module').then(m => m.ProjectCalculatorModule),
    data: {
      isLogged: false
    }
  },
  {
    path: 'projects-portfolio',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProjectListComponent,
      },
      {
        path: ':id',
        component: ProjectDetailsComponent,
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
        data: {
          isLogged: false
        }
      }
    ],
    data: {
      isLogged: false
    }
  },
  {
    path: 'portfolio',
    component: ProjectListComponent,
    data: {
      isLogged: false
    }
  },
  {
    path: 'project-create',
    component: ProjectCreateComponent,
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
    canActivate: [AuthGuard],
    data: {
      isLogged: true
    }
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, TranslateModule]
})

export class AppRoutingModule { }
