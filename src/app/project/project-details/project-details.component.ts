import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: any;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;


  constructor(private projectService: ProjectService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private auth: AuthService,
              private toastr: ToastrService) {
    this.activatedRoute.params.forEach((params: Params) => {
      this.projectService.getProject(this.activatedRoute.snapshot.params.id)
        .then((data) => this.project = data.data());
    });
  }

  ngOnInit(): void {
  }

  isLogged() {
    return this.auth.activeUser;
  }

  async countStar(star) {
    this.selectedValue = star;
    try {
      await this.projectService.rate(star, this.project._id);
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
