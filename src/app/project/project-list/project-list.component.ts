import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {IProject} from '../../shared/project';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    standalone: false
})

export class ProjectListComponent implements OnInit {
  projects: IProject[];
  title: string;

  constructor(private projectService: ProjectService) {
    this.projectService.getCollection()
      .then((querySnapshot) => {
        this.projects = querySnapshot.docs;
      });
  }

  ngOnInit() {
  }
}
