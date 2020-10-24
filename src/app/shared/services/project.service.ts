import {Injectable, InjectionToken} from '@angular/core';
import { IProject } from '../project';
import {AuthService} from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projects: any[] = [];
  project: IProject;

  constructor(private auth: AuthService, private firestore: AngularFirestore) {
    this.getAllProjects();
  }

  getAllProjects() {
    return this.firestore
      .collection('projects')
      .get()
      .subscribe((projects) => {
        projects.forEach((project) => {
          this.projects.push(project.data() as {});
        });
      });
  }

  getProject(id: string) {
    return this.projects.find(project => project._id === id);
  }

  async create(project: IProject) {
    await this.firestore.collection('projects').add({
      project
    });
    this.projects = [];
    this.getAllProjects();
    return project;
  }

  async delete(id: string) {
    const project = this.projects.find(p => p.i === id);
    if (project) {
      await this.firestore.collection('testCollection').doc(id).delete();
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

    await this.firestore.collection('projects').snapshotChanges()
      .forEach((changes) => {
      changes.map((a) => {
        id = a.payload.doc.id;
      });
    });
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
