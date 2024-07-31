import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRecordComponent } from './service-record.component';

describe('ServiceRecordComponent', () => {
  let component: ServiceRecordComponent;
  let fixture: ComponentFixture<ServiceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
