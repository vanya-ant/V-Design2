import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    standalone: false
})

export class ProjectListComponent implements OnInit {

  constructor(private projectService: ProjectService) {
    this.projectService.getCollection()
      .then((querySnapshot: { docs: any; }) => {
        this.projects = querySnapshot.docs;
      });
  }
  projects: any;
  title: string;

  ngOnInit() {
  }

  getRatingArray(n: number): Array<number> {
    return Array(n);
  }
}
