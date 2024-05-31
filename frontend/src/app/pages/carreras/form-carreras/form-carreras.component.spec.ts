import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarrerasComponent } from './form-carreras.component';

describe('FormCarrerasComponent', () => {
  let component: FormCarrerasComponent;
  let fixture: ComponentFixture<FormCarrerasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCarrerasComponent]
    });
    fixture = TestBed.createComponent(FormCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
