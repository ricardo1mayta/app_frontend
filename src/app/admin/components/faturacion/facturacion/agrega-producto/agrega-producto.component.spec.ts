import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaProductoComponent } from './agrega-producto.component';

describe('AgregaProductoComponent', () => {
  let component: AgregaProductoComponent;
  let fixture: ComponentFixture<AgregaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
