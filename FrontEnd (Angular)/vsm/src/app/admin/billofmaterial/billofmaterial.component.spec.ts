import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillofmaterialComponent } from './billofmaterial.component';

describe('BillofmaterialComponent', () => {
  let component: BillofmaterialComponent;
  let fixture: ComponentFixture<BillofmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillofmaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillofmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
