import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreccionfacturaComponent } from './correccionfactura.component';

describe('CorreccionfacturaComponent', () => {
  let component: CorreccionfacturaComponent;
  let fixture: ComponentFixture<CorreccionfacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorreccionfacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreccionfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
