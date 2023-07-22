import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineMediaComponent } from './combine-media.component';

describe('CombineMediaComponent', () => {
  let component: CombineMediaComponent;
  let fixture: ComponentFixture<CombineMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombineMediaComponent]
    });
    fixture = TestBed.createComponent(CombineMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
