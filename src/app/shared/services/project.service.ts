import {Injectable, InjectionToken} from '@angular/core';
import { IProject } from '../project';
import {AuthService} from './auth.service';
import {AngularFirestore, CollectionReference} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

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
        _filename: file.name,
        mimeType: file.type,
        size: file.size,
        _public: true,
        projectId: id,
      };
/*      var storageRef = firebase.storage().ref();
      ref.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });*/
    } catch (e) {
      console.log(e);
    }
  }
}
