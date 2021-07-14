import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartmensualusuarioComponent } from './chartmensualusuario.component';

describe('ChartmensualusuarioComponent', () => {
  let component: ChartmensualusuarioComponent;
  let fixture: ComponentFixture<ChartmensualusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartmensualusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartmensualusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
