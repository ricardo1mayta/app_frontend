import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaditocomprasComponent } from './creaditocompras.component';

describe('CreaditocomprasComponent', () => {
  let component: CreaditocomprasComponent;
  let fixture: ComponentFixture<CreaditocomprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaditocomprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaditocomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
