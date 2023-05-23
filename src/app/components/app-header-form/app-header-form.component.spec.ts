import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderFormComponent } from './app-header-form.component';

describe('AppHeaderFormComponent', () => {
  let component: AppHeaderFormComponent;
  let fixture: ComponentFixture<AppHeaderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeaderFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHeaderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
