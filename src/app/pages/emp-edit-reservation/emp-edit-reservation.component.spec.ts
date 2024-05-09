import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditReservationComponent } from './emp-edit-reservation.component';

describe('EmpEditReservationComponent', () => {
  let component: EmpEditReservationComponent;
  let fixture: ComponentFixture<EmpEditReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpEditReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpEditReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
