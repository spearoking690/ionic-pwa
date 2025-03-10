import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseInquiryPage } from './expense-inquiry.page';

describe('ExpenseInquiryPage', () => {
  let component: ExpenseInquiryPage;
  let fixture: ComponentFixture<ExpenseInquiryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseInquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
