import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgregarTutorComponent } from './editar-agregar-tutor.component';

describe('EditarAgregarTutorComponent', () => {
  let component: EditarAgregarTutorComponent;
  let fixture: ComponentFixture<EditarAgregarTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAgregarTutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAgregarTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
