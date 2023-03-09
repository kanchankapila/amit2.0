import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaniftyComponent } from './pharmanifty.component';

describe('PharmaniftyComponent', () => {
  let component: PharmaniftyComponent;
  let fixture: ComponentFixture<PharmaniftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaniftyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaniftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
