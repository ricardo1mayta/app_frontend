import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviofacturasComponent } from './enviofacturas.component';

describe('EnviofacturasComponent', () => {
  let component: EnviofacturasComponent;
  let fixture: ComponentFixture<EnviofacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviofacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviofacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
