import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemSaComponent } from './work-item-sa.component';

describe('WorkItemSaComponent', () => {
  let component: WorkItemSaComponent;
  let fixture: ComponentFixture<WorkItemSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkItemSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
