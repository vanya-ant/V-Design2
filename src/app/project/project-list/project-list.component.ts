import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {
  projects: any;
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
