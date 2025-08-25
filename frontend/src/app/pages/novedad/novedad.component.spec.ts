import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadComponent } from './novedad.component';

describe('NovedadComponent', () => {
  let component: NovedadComponent;
  let fixture: ComponentFixture<NovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
