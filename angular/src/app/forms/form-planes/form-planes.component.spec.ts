import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanesComponent } from './form-planes.component';

describe('FormPlanesComponent', () => {
  let component: FormPlanesComponent;
  let fixture: ComponentFixture<FormPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPlanesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
