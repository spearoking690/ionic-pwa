import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressSearchPage } from './address-search.page';

describe('AddressSearchPage', () => {
  let component: AddressSearchPage;
  let fixture: ComponentFixture<AddressSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
