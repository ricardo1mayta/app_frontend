import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComprasProductoComponent } from './list-compras-producto.component';

describe('ListComprasProductoComponent', () => {
  let component: ListComprasProductoComponent;
  let fixture: ComponentFixture<ListComprasProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComprasProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComprasProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
