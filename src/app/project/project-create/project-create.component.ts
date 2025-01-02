import { Component, OnInit } from '@angular/core';
import {IProject} from '../../shared/project';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../shared/services/project.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-project-create',
    templateUrl: './project-create.component.html',
    styleUrls: ['./project-create.component.scss'],
    standalone: false
})
export class ProjectCreateComponent implements OnInit {

  form: UntypedFormGroup;
  urlRegex = '(https?://)?([a-z0-9/.-?-A-Z/&]+)';
  files: File [] = [];
  project: IProject;

  constructor( private fb: UntypedFormBuilder,
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
    const id: string = uuid();
    const uploadedFiles = await this.projectService.uploadFiles(this.files);
    this.project = {
      id,
      title: this.form.value.title,
      year: this.form.value.year,
      description: this.form.value.description,
      rating: 0,
      imageUrl: uploadedFiles,
    };
    const creationResult = await this.projectService.create(this.project)
      .catch(err => {
        console.error('Project creation failed:', err);
        this.toastr.error('Failed to create project ' + this.project.imageUrl);
        return null;
      });
    if (creationResult) {
      await this.router.navigate(['projects-portfolio']);
      this.toastr.success('Successfully created project');
    }
  }

  onFileChange(event: any) {
    let file: any;
    for (file of event.target.files) {
        this.files.push(file);
      }
  }
}
