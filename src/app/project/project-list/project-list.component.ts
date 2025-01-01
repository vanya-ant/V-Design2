import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import { TranslateService } from '@ngx-translate/core';
import {Projects} from '@angular/cli/lib/config/workspace-schema';
import {IProject} from '../../shared/project';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    standalone: false
})

export class ProjectListComponent implements OnInit {
  projects: IProject[];
  title: string;

  constructor(private projectService: ProjectService, private translateService: TranslateService) {
    this.projectService.getCollection()
      .then((querySnapshot) => {
        this.projects = querySnapshot.docs;
      });
  }

  ngOnInit() {
  }
}
