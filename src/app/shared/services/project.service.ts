import {Injectable} from '@angular/core';
import {IProject} from '../project';
import {AuthService} from './auth.service';
import {AngularFirestore, CollectionReference} from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projectsCollection: CollectionReference;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadUrl: string;

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

  uploadFile(file: File) {
     const storageRef = firebase.storage().ref();
     const uploadTask = storageRef.child('images/' + file.name).put(file);
     uploadTask.snapshot.ref.getDownloadURL().then(url => this.downloadUrl = url);
  }
}
