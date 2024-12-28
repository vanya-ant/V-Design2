import { Component, OnInit } from '@angular/core';
import {IProject} from '../../shared/project';
import {ProjectService} from '../../shared/services/project.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-project-portfolio',
    templateUrl: './project-portfolio.component.html',
    styleUrls: ['./project-portfolio.component.scss'],
    standalone: false
})
export class ProjectPortfolioComponent implements OnInit {

  projects: any;

  constructor(private projectService: ProjectService) {
    this.projectService.getCollection()
      .then((querySnapshot) => {
        this.projects = querySnapshot.docs;
      });
  }

  ngOnInit(): void {
  }

  openImg(imageUrl) {
    window.open(imageUrl);
  }
}
