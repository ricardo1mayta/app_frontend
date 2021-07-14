import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GananciasedeComponent } from './gananciasede.component';

describe('GananciasedeComponent', () => {
  let component: GananciasedeComponent;
  let fixture: ComponentFixture<GananciasedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GananciasedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GananciasedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
