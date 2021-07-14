import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartmensualComponent } from './chartmensual.component';

describe('ChartmensualComponent', () => {
  let component: ChartmensualComponent;
  let fixture: ComponentFixture<ChartmensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartmensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartmensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
