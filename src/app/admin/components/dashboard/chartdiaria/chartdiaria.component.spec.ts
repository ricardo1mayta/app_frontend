import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartdiariaComponent } from './chartdiaria.component';

describe('ChartdiariaComponent', () => {
  let component: ChartdiariaComponent;
  let fixture: ComponentFixture<ChartdiariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartdiariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartdiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
