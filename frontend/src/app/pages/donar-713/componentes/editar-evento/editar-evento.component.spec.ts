import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEventoComponent } from './editar-evento.component';

describe('EditarEventoComponent', () => {
  let component: EditarEventoComponent;
  let fixture: ComponentFixture<EditarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEventoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
