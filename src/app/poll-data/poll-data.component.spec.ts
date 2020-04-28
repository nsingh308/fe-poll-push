import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollDataComponent } from './poll-data.component';

describe('PollDataComponent', () => {
  let component: PollDataComponent;
  let fixture: ComponentFixture<PollDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
