import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCooperadoraComponent } from './gestion-cooperadora.component';

describe('GestionCooperadoraComponent', () => {
  let component: GestionCooperadoraComponent;
  let fixture: ComponentFixture<GestionCooperadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCooperadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCooperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
