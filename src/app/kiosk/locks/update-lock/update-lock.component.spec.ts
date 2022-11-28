import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLockComponent } from './update-lock.component';

describe('UpdateLockComponent', () => {
  let component: UpdateLockComponent;
  let fixture: ComponentFixture<UpdateLockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
