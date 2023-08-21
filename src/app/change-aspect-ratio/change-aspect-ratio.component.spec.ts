import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAspectRatioComponent } from './change-aspect-ratio.component';

describe('ChangeAspectRatioComponent', () => {
  let component: ChangeAspectRatioComponent;
  let fixture: ComponentFixture<ChangeAspectRatioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAspectRatioComponent]
    });
    fixture = TestBed.createComponent(ChangeAspectRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
