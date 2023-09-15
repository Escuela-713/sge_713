import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEstudianteComponent } from './buscar-estudiante.component';

describe('BuscarEstudianteComponent', () => {
  let component: BuscarEstudianteComponent;
  let fixture: ComponentFixture<BuscarEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEstudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
