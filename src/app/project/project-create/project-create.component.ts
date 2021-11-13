import { Component, OnInit } from '@angular/core';
import {IProject} from '../../shared/project';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../shared/services/project.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as uuid from 'uuid';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  form: FormGroup;
  urlRegex = '(https?://)?([a-z0-9/.-?-A-Z/&]+)';
  files: File [] = [];
  project: IProject;

  constructor( private fb: FormBuilder,
               private projectService: ProjectService,
               private auth: AuthService,
               private router: Router,
               private toastr: ToastrService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      year: ['', [Validators.required]],
      rating: [0],
      file: [[]]
    });
  }

  ngOnInit(): void {
  }

  async createProject() {
    const array =  await this.projectService.uploadFiles(this.files);
    this.project = {
          id: uuid.v4(),
          title: this.form.value.title,
          year: this.form.value.year,
          description: this.form.value.description,
          rating: 0,
          imageUrl:  array,
    };

    await this.projectService.create(this.project);

    await this.router.navigate(['projects-portfolio']);
    this.toastr.success('Successfully created project');
  }

  onFileChange(event: any) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
  }
}
