import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarHomeComponent } from './donar-home.component';

describe('DonarHomeComponent', () => {
  let component: DonarHomeComponent;
  let fixture: ComponentFixture<DonarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonarHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonarHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
