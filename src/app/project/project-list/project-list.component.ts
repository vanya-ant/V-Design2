import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {IProject} from '../../shared/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {

  projects: IProject[] = this.projectService.projects;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {}
}
