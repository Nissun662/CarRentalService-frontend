import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpVehicleListComponent } from './emp-vehicle-list.component';

describe('EmpVehicleListComponent', () => {
  let component: EmpVehicleListComponent;
  let fixture: ComponentFixture<EmpVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpVehicleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
