import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustVehicleListComponent } from './cust-vehicle-list.component';

describe('CustVehicleListComponent', () => {
  let component: CustVehicleListComponent;
  let fixture: ComponentFixture<CustVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustVehicleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
