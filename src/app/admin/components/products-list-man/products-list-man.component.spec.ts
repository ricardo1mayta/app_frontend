import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListManComponent } from './products-list-man.component';

describe('ProductsListManComponent', () => {
  let component: ProductsListManComponent;
  let fixture: ComponentFixture<ProductsListManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
