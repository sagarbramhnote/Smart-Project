import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PComponent } from './p.component';

describe('PComponent', () => {
  let component: PComponent;
  let fixture: ComponentFixture<PComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
