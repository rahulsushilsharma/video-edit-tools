import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbGenratorComponent } from './thumb-genrator.component';

describe('ThumbGenratorComponent', () => {
  let component: ThumbGenratorComponent;
  let fixture: ComponentFixture<ThumbGenratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbGenratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbGenratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
