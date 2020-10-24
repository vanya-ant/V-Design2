import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {IProject} from '../../shared/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {

  projects = this.projectService.getAllProjects();

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    console.log(this.projects);
  }
}
