import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprascComponent } from './comprasc.component';

describe('ComprascComponent', () => {
  let component: ComprascComponent;
  let fixture: ComponentFixture<ComprascComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprascComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprascComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
