import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResumenventasComponent } from './list-resumenventas.component';

describe('ListResumenventasComponent', () => {
  let component: ListResumenventasComponent;
  let fixture: ComponentFixture<ListResumenventasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListResumenventasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResumenventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
