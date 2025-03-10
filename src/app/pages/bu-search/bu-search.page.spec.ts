import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuSearchPage } from './bu-search.page';

describe('BuSearchPage', () => {
  let component: BuSearchPage;
  let fixture: ComponentFixture<BuSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
