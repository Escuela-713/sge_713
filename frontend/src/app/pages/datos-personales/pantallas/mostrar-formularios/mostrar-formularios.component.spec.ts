import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarFormulariosComponent } from './mostrar-formularios.component';

describe('MostrarFormulariosComponent', () => {
  let component: MostrarFormulariosComponent;
  let fixture: ComponentFixture<MostrarFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarFormulariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
