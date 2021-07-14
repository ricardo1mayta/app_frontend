import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoclistaComponent } from './pagoclista.component';

describe('PagoclistaComponent', () => {
  let component: PagoclistaComponent;
  let fixture: ComponentFixture<PagoclistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoclistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoclistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
