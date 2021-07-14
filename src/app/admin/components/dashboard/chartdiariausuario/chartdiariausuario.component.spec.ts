import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartdiariausuarioComponent } from './chartdiariausuario.component';

describe('ChartdiariausuarioComponent', () => {
  let component: ChartdiariausuarioComponent;
  let fixture: ComponentFixture<ChartdiariausuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartdiariausuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartdiariausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
