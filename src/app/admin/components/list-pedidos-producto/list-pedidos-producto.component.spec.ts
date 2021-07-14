import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPedidosProductoComponent } from './list-pedidos-producto.component';

describe('ListPedidosProductoComponent', () => {
  let component: ListPedidosProductoComponent;
  let fixture: ComponentFixture<ListPedidosProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPedidosProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPedidosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
