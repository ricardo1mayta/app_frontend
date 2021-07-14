import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagocComponent } from './pagoc.component';

describe('PagocComponent', () => {
  let component: PagocComponent;
  let fixture: ComponentFixture<PagocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
