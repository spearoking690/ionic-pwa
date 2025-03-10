import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseEntryPage } from './expense-entry.page';

describe('ExpenseEntryPage', () => {
  let component: ExpenseEntryPage;
  let fixture: ComponentFixture<ExpenseEntryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
