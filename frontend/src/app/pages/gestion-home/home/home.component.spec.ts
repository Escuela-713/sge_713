import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGestionComponent } from './home.component';

describe('HomeGestionComponent', () => {
  let component: HomeGestionComponent;
  let fixture: ComponentFixture<HomeGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
