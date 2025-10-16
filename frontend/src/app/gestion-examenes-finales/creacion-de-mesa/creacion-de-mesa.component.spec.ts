import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionDeMesaComponent } from './creacion-de-mesa.component';

describe('CreacionDeMesaComponent', () => {
  let component: CreacionDeMesaComponent;
  let fixture: ComponentFixture<CreacionDeMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionDeMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionDeMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
