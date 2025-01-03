import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {IProject} from '../../shared/project';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    standalone: false
})
export class ProjectDetailsComponent implements OnInit {

  project: IProject;
  projects: IProject[];
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(private projectService: ProjectService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private auth: AuthService,
              private toastr: ToastrService) {
    this.activatedRoute.params.forEach((params: Params) => {
      this.projectService.getProject(this.activatedRoute.snapshot.params.id)
        .then((data: { data: () => IProject; }) => this.project = data.data());
    });
  }

  ngOnInit(): void {
  }

  isLogged() {
    return this.auth.activeUser;
  }

  isAdmin() {
    return this.auth.isAdmin;
  }

  async countStar(star: number) {
    this.selectedValue = star;
    try {
      await this.projectService.rate(star, this.project);
      this.toastr.success(`Successfully rated project with ${star} stars!`);
    } catch (error) {
      this.toastr.error('Error');
    }
  }

  async delete(id: string) {
    try {
      await this.projectService.delete(id);
      await this.router.navigate(['projects-portfolio']);
      this.toastr.success('Successfully deleted project');
    } catch (error) {
      this.toastr.error('Error');
    }
  }
}
