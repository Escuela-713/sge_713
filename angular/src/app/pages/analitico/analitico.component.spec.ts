import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticoComponent } from './analitico.component';

describe('AnaliticoComponent', () => {
  let component: AnaliticoComponent;
  let fixture: ComponentFixture<AnaliticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
