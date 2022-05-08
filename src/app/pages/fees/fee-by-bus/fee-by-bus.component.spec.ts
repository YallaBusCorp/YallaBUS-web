import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeByBusComponent } from './fee-by-bus.component';

describe('FeeByBusComponent', () => {
  let component: FeeByBusComponent;
  let fixture: ComponentFixture<FeeByBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeByBusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeByBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
