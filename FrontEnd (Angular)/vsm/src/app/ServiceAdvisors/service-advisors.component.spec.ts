import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAdvisorsComponent } from './service-advisors.component';

describe('ServiceAdvisorsComponent', () => {
  let component: ServiceAdvisorsComponent;
  let fixture: ComponentFixture<ServiceAdvisorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAdvisorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAdvisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
