import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnOComponent } from './fn-o.component';

describe('FnOComponent', () => {
  let component: FnOComponent;
  let fixture: ComponentFixture<FnOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FnOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FnOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
