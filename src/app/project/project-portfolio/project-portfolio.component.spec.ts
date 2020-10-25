import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPortfolioComponent } from './project-portfolio.component';

describe('ProjectPortfolioComponent', () => {
  let component: ProjectPortfolioComponent;
  let fixture: ComponentFixture<ProjectPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
