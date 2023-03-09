import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenersComponent } from './screeners.component';

describe('ScreenersComponent', () => {
  let component: ScreenersComponent;
  let fixture: ComponentFixture<ScreenersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
