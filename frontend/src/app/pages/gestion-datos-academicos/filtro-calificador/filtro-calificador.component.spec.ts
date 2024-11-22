import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCalificadorComponent } from './filtro-calificador.component';

describe('FiltroCalificadorComponent', () => {
  let component: FiltroCalificadorComponent;
  let fixture: ComponentFixture<FiltroCalificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroCalificadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroCalificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
