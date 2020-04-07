import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartResultComponent } from './chart-result.component';

describe('ChartResultComponent', () => {
  let component: ChartResultComponent;
  let fixture: ComponentFixture<ChartResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
