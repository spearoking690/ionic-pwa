import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UdcSearchPage } from './udc-search.page';

describe('UdcSearchPage', () => {
  let component: UdcSearchPage;
  let fixture: ComponentFixture<UdcSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UdcSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
