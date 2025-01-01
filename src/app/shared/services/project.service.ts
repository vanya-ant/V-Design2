import {Injectable} from '@angular/core';
import {IProject} from '../project';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import {Projects} from '@angular/cli/lib/config/workspace-schema';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projectsCollection;
  projects: Observable<Projects[]>;
  projectDocs: AngularFirestoreDocument<Projects>;
  // ref: AngularFireStorageReference;
  array: string [] = [];

  constructor(private db: AngularFirestore) {
    this.projectsCollection = this.db.collection<IProject> ('projects').ref;
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
    if (project.rating === 0) {
      project.rating += star;
    }
    project.rating += star;
    project.rating = project.rating / 2;
    Math.round(project.rating);

    await this.db.collection('projects').doc(project.id).update({rating: project.rating});
  }

  async uploadFiles(files: File[], id: string) {
    const storageRef = firebase.storage().ref();
    for (const file of files) {
      const task = storageRef.child('images/' + file.name).put(file)
        .then(snapshot => snapshot.ref.getDownloadURL());
      this.array.push(await task);
    }
    return this.array;
  }
}
