import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMesaExamenComponent } from './registro-mesa-examen.component';

describe('RegistroMesaExamenComponent', () => {
  let component: RegistroMesaExamenComponent;
  let fixture: ComponentFixture<RegistroMesaExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMesaExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMesaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
