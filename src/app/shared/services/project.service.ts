import {Injectable} from '@angular/core';
import {IProject} from '../project';
import {AuthService} from './auth.service';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projectsCollection;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  array: string [] = [];

  constructor(private auth: AuthService, private db: AngularFirestore, private afStorage: AngularFireStorage) {
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
     for (let i = 0; i < files.length; i++) {
       const task = storageRef.child('images/' + files[i].name).put(files[i])
         .then(snapshot => snapshot.ref.getDownloadURL());
       this.array.push(await task);
     }
     return this.array;
   }
}
