import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosIdentidadComponent } from './datos-identidad.component';

describe('DatosIdentidadComponent', () => {
  let component: DatosIdentidadComponent;
  let fixture: ComponentFixture<DatosIdentidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosIdentidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosIdentidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
