import {Injectable, InjectionToken} from '@angular/core';
import { IProject } from '../project';
import {AuthService} from './auth.service';
import {AngularFirestore, CollectionReference} from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projectsCollection: CollectionReference;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.projectsCollection = db.collection<IProject>('projects').ref;
  }

  getCollection() {
    return this.projectsCollection.get();
  }

  getProject(id: string) {
    return this.projectsCollection.doc(id).get();
  }

  async create(project: IProject) {
    return this.projectsCollection.doc(project.id).set(project);
  }

  async delete(id: string) {
    await this.projectsCollection.doc(id).delete();
  }

  async rate(star, project: any) {
/*    const currentProject = this.getProject(id);*/
    if (project.rating === 0) {
      project.rating += star;
    }
    project.rating += star;
    project.rating = project.rating / 2;
    Math.round(project.rating);

    await this.db.collection('projects').doc(project.id).update({rating: project.rating});
  }

  async uploadFile(file: File, id: string) {
    try {
      const metadata = {
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        public: true,
        projectId: id,
      };
      const storageRef = firebase.storage().ref();
      const downloadUrl = storageRef.child('images/' + file.name).put(file);
      console.log(downloadUrl);
    } catch (e) {
      console.log(e.message);
    }
  }
}
