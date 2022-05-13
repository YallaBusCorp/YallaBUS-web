import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPriceComponent } from './subscription-price.component';

describe('SubscriptionPriceComponent', () => {
  let component: SubscriptionPriceComponent;
  let fixture: ComponentFixture<SubscriptionPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
