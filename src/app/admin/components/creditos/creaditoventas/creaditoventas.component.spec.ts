import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaditoventasComponent } from './creaditoventas.component';

describe('CreaditoventasComponent', () => {
  let component: CreaditoventasComponent;
  let fixture: ComponentFixture<CreaditoventasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaditoventasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaditoventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
