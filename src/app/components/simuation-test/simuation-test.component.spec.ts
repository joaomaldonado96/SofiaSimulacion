import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuationTestComponent } from './simuation-test.component';

describe('SimuationTestComponent', () => {
  let component: SimuationTestComponent;
  let fixture: ComponentFixture<SimuationTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuationTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
