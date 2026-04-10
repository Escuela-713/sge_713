import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Donar713Component } from './donar-713.component';

describe('Donar713Component', () => {
  let component: Donar713Component;
  let fixture: ComponentFixture<Donar713Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Donar713Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Donar713Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
