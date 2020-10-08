import {Injectable, InjectionToken} from '@angular/core';
import { IProject } from '../project';
import {AuthService} from './auth.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import firebase from 'firebase';

/*const database = firebase.database();*/

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projects: IProject[] = [];
  project: IProject;
  private dataStore: any;

  constructor(private auth: AuthService) {
  }

  getAllProjects() {
    this.dataStore.find().toPromise().then((entities) => {
      entities.forEach(en => this.projects.push(en));
    });
  }

  getProject(id: string) {
    return this.projects.find(project => project._id === id);
  }

  async create(project: IProject) {
    const createdProject = await this.dataStore.save(project);
    this.projects = [];
    this.getAllProjects();
    return createdProject;
  }

  async delete(id: string) {
    const project = this.projects.find(p => p._id === id);
    if (project) {
      await this.dataStore.removeById(id);
    }
    this.projects = [];
    this.getAllProjects();
  }

  async rate(star, id: string) {
    const currentProject = await this.getProject(id);
    if (currentProject.rating === 0) {
      currentProject.rating += star;
    }
    currentProject.rating += star;
    currentProject.rating = currentProject.rating / 2;
    Math.round(currentProject.rating);

    this.dataStore.update(currentProject);
  }

  async uploadFile(file: File, id: string) {
    try {
      const metadata = {
        _filename: file.name,
        mimeType: file.type,
        size: file.size,
        _public: true,
        projectId: id,
      };
      /*await this.fileService.upload(file, metadata);*/
    } catch (e) {
      console.log(e);
    }
  }
}
