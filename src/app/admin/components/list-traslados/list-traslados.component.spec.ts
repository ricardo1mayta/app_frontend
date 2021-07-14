import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrasladosComponent } from './list-traslados.component';

describe('ListTrasladosComponent', () => {
  let component: ListTrasladosComponent;
  let fixture: ComponentFixture<ListTrasladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrasladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrasladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
