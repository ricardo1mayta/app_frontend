import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactuacionComponent } from './factuacion.component';

describe('FactuacionComponent', () => {
  let component: FactuacionComponent;
  let fixture: ComponentFixture<FactuacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactuacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactuacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
