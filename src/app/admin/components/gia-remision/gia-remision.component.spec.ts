import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaRemisionComponent } from './gia-remision.component';

describe('GiaRemisionComponent', () => {
  let component: GiaRemisionComponent;
  let fixture: ComponentFixture<GiaRemisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaRemisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
