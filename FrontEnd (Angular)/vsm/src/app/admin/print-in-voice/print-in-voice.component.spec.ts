import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInVoiceComponent } from './print-in-voice.component';

describe('PrintInVoiceComponent', () => {
  let component: PrintInVoiceComponent;
  let fixture: ComponentFixture<PrintInVoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintInVoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintInVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
