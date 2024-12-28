import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProjectCalculatorService } from '../../shared/services/project-calculator.service';

@Component({
    selector: 'app-project-calculator',
    templateUrl: './project-calculator.component.html',
    styleUrls: ['./project-calculator.component.scss'],
    standalone: false
})
export class ProjectCalculatorComponent implements OnInit {

  projectCalculatorForm: UntypedFormGroup;
  formValue: any;
  submitted = false;

  constructor(private  fb: UntypedFormBuilder, private projectCalculatorService: ProjectCalculatorService) {
    this.projectCalculatorForm = this.fb.group({
      property: ['Studio', [Validators.required]],
      project:  ['Basic', [Validators.required]],
      bedrooms: ['0', [Validators.required, Validators.min(0)]],
      bathrooms: ['0', [Validators.required, Validators.min(1)]],
      area: ['0', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
  }

  loadData() {
    this.formValue = this.projectCalculatorForm.value;
  }

  calculate() {
    this.loadData();
    return this.projectCalculatorService.calculate(this.formValue);
  }

}
