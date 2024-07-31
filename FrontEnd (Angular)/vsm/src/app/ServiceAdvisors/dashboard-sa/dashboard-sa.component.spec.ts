import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSaComponent } from './dashboard-sa.component';

describe('DashboardSaComponent', () => {
  let component: DashboardSaComponent;
  let fixture: ComponentFixture<DashboardSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
