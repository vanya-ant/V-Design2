import { Component, OnInit } from '@angular/core';
import {IProject} from '../../shared/project';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../shared/services/project.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {


  form: FormGroup;
  urlRegex = '(https?://)?([a-z0-9/.-?-A-Z/&]+)';
  public pictures = [];

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
      imageUrl: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
      rating: [0],
      file: ['']
    });
  }

  ngOnInit(): void {
  }

  async createProject(project: IProject) {
    project.title = this.form.value.title;
    project.year = this.form.value.year;
    project.description = this.form.value.description;
    project.imageUrl = this.form.value.imageUrl;
    project.rating = 0;

    const createdProject = await this.projectService.create(project);
    const uploadedFile = await this.projectService.uploadFile(this.pictures[0], project.id);

    await this.router.navigate(['projects-portfolio']);
    this.toastr.success('Successfully created project');
  }

  onUploadFinished(event) {
    this.pictures.push(event.file);
  }
}
