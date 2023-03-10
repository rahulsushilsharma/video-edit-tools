import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractAudioComponent } from './extract-audio.component';

describe('ExtractAudioComponent', () => {
  let component: ExtractAudioComponent;
  let fixture: ComponentFixture<ExtractAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractAudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtractAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
