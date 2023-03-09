import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiftyComponent } from './nifty.component';

describe('NiftyComponent', () => {
  let component: NiftyComponent;
  let fixture: ComponentFixture<NiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiftyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
