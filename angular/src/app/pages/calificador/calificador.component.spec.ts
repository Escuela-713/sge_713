import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificadorComponent } from './calificador.component';

describe('CalificadorComponent', () => {
  let component: CalificadorComponent;
  let fixture: ComponentFixture<CalificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
