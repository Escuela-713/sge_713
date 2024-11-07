import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorComponent } from './buscador.component';

describe('BuscadorComponent', () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
