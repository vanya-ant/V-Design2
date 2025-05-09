import { Component, OnInit } from '@angular/core';
import {IProject} from '../../shared/project';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../shared/services/project.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as uuid from 'uuid';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: false
})
export class AdminComponent implements OnInit {
  form: UntypedFormGroup;
  urlRegex = '(https?://)?([a-z0-9/.-?-A-Z/&]+)';
  public pictures = [];

  constructor( private fb: UntypedFormBuilder,
               private projectService: ProjectService,
               private router: Router,
               private toastr: ToastrService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      year: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
      rating: [0],
      file: ['']
    });
  }

  ngOnInit(): void {
  }

  async createProject(project: IProject) {
    project.id = uuid.v4();
    project.title = this.form.value.title;
    project.year = this.form.value.year;
    project.description = this.form.value.description;
    project.imageUrl = this.form.value.imageUrl;
    project.rating = 0;

  /*  const createdProject = await this.projectService.create(project, file);*/
    await this.projectService.uploadFiles(this.pictures[0]);

    await this.router.navigate(['projects-portfolio']);
    this.toastr.success('Successfully created project');
  }
}
