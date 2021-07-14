import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContizacionComponent } from './contizacion.component';

describe('ContizacionComponent', () => {
  let component: ContizacionComponent;
  let fixture: ComponentFixture<ContizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
