import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContizacionComponent } from './list-contizacion.component';

describe('ListContizacionComponent', () => {
  let component: ListContizacionComponent;
  let fixture: ComponentFixture<ListContizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
