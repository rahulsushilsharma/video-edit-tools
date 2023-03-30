import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatConvortorComponent } from './format-convortor.component';

describe('FormatConvortorComponent', () => {
  let component: FormatConvortorComponent;
  let fixture: ComponentFixture<FormatConvortorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatConvortorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatConvortorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
