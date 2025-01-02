import {Injectable} from '@angular/core';
import {IProject} from '../project';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projectsCollection;
  array: string [] = [];
  downloadURL: string;
  path: string;

  constructor(private db: AngularFirestore, private st: AngularFireStorage) {
    this.projectsCollection = this.db.collection('projects').ref;
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

  // async uploadFiles(files: File[], id) {
  //   const storageRef = this.st.ref('projects').child('images/');
  //   for (const file of files) {
  //     this.path = `images/${file.name}`;
  //     const task = this.st.upload(this.path, file)
  //       .snapshotChanges()
  //       .pipe()
  //       .subscribe( async async => {
  //         this.downloadURL = await storageRef.getDownloadURL().toPromise();
  //         this.array.push(this.downloadURL);
  //       });
  //   }
  //   return this.array;
  // }

  async uploadFiles(files: File[]): Promise<any> {
    const storageRef = this.st.ref('projects');
    if (files && files.length) {
      try {
        for (const file of files){
          const task = storageRef.child('images/' + file.name).put(file)
            .then(snapshot => snapshot.ref.getDownloadURL());
          this.array.push(await task);
        }
      } catch (error) {
        console.log(error);
      }

      return this.array;
    }
  }
}
