import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';

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
      .then((querySnapshot: { docs: any; }) => {
        this.projects = querySnapshot.docs;
      });
  }

  ngOnInit(): void {
  }

  openImg(imageUrl: string | URL) {
    window.open(imageUrl);
  }
}
