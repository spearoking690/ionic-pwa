import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  private user: string;
  private accessToken: string;
  private addressBook: string;
  private ereportType: string;
  private personID: string;
  private eRepTypeKey: string;
  private reportDescription: string;
  private reportType: string;
  private displayMode: string;
  private date: string;
  private displayModeKey: string;
  private expenseCategory: string;
  private ecKey: string;
  private chargeType: string;
  private ctKey: string;
  private eLocation: string;
  private elKey: string;
  private paymethod: string;
  private pmKey: string;
  private eCurrency: string;
  private addressNo1: string;
  private name1: string;
  private employeeType: string;
  private eRoom: boolean;
  private doctor: boolean;
  private firstaid: boolean;
  private privacyCase: boolean;
  private injuryDescription: string;
  private incRole: string;
  private hospital: boolean;
  private expenseList: Expenseinfo[];
  private aisLink: string;
  private businessUnit: string;
  private rate: string;
  private qty: string;
  private eAmt: string;

  public getQty(): string {
    return this.qty;
  }

  public setQty(qty: string): void {
    this.qty = qty;
  }

  public getEAmt(): string {
    return this.eAmt;
  }

  public setEAmt(eAmt: string): void {
    this.eAmt = eAmt;
  }

  public getRate(): string {
    return this.rate;
  }

  public setRate(rate: string): void {
    this.rate = rate;
  }

  public getBusinessUnit(): string {
    return this.businessUnit;
  }

  public setBusinessUnit(businessUnit: string): void {
    this.businessUnit = businessUnit;
  }

  public getPaymethod(): string {
    return this.paymethod;
  }

  public setPaymethod(paymethod: string): void {
    this.paymethod = paymethod;
  }

  public getPmKey(): string {
    return this.pmKey;
  }

  public setPmKey(pmKey: string): void {
    this.pmKey = pmKey;
  }
  public getELocation(): string {
    return this.eLocation;
  }

  public setELocation(eLocation: string): void {
    this.eLocation = eLocation;
  }

  public getElKey(): string {
    return this.elKey;
  }

  public setElKey(elKey: string): void {
    this.elKey = elKey;
  }
  public getChargeType(): string {
    return this.chargeType;
  }

  public setChargeType(chargeType: string): void {
    this.chargeType = chargeType;
  }

  public getCtKey(): string {
    return this.ctKey;
  }

  public setCtKey(ctKey: string): void {
    this.ctKey = ctKey;
  }
  public getExpenseCategory(): string {
    return this.expenseCategory;
  }

  public setExpenseCategory(expenseCategory: string): void {
    this.expenseCategory = expenseCategory;
  }

  public getEcKey(): string {
    return this.ecKey;
  }

  public setEcKey(ecKey: string): void {
    this.ecKey = ecKey;
  }
  public getaisLink(): string {
    return this.aisLink;
  }
  public setaisLink(value: string) {
    this.aisLink = value;
  }

  public getuser(): string {
    return this.user;
  }
  public setuser(value: string) {
    this.user = value;
  }

  public getExpenseList(): Expenseinfo[] {
    return this.expenseList;
  }
  public setExpenseList(value: Expenseinfo[]) {
    this.expenseList = value;
  }

  public getreportDescription(): string {
    return this.reportDescription;
  }
  public setreportDescription(value: string) {
    this.reportDescription = value;
  }

  public getreportType(): string {
    return this.reportType;
  }
  public setreportType(value: string) {
    this.reportType = value;
  }

  public getdisplayMode(): string {
    return this.displayMode;
  }
  public setdisplayMode(value: string) {
    this.displayMode = value;
  }

  public getdate(): string {
    return this.date;
  }
  public setdate(value: string) {
    this.date = value;
  }

  public getdisplayModeKey(): string {
    return this.displayModeKey;
  }
  public setdisplayModeKey(value: string) {
    this.displayModeKey = value;
  }

  public geteCurrency(): string {
    return this.eCurrency;
  }
  public seteCurrency(value: string) {
    this.eCurrency = value;
  }

  public getaddressNo1(): string {
    return this.addressNo1;
  }
  public setaddressNo1(value: string) {
    this.addressNo1 = value;
  }

  public getname1(): string {
    return this.name1;
  }
  public setname1(value: string) {
    this.name1 = value;
  }
  public getemployeeType(): string {
    return this.employeeType;
  }
  public setemployeeType(value: string) {
    this.employeeType = value;
  }

  public getincRole(): string {
    return this.incRole;
  }
  public setincRole(value: string) {
    this.incRole = value;
  }

  public getinjuryDescription(): string {
    return this.injuryDescription;
  }
  public setinjuryDescription(value: string) {
    this.injuryDescription = value;
  }

  public getprivacyCase(): boolean {
    return this.privacyCase;
  }
  public setprivacyCase(value: boolean) {
    this.privacyCase = value;
  }

  public getfirstaid(): boolean {
    return this.firstaid;
  }
  public setfirstaid(value: boolean) {
    this.firstaid = value;
  }

  public geteRoom(): boolean {
    return this.eRoom;
  }
  public seteRoom(value: boolean) {
    this.eRoom = value;
  }

  public gethospital(): boolean {
    return this.hospital;
  }
  public sethospital(value: boolean) {
    this.hospital = value;
  }

  public getaddressBook(): string {
    return this.addressBook;
  }
  public setaddressBook(value: string) {
    this.addressBook = value;
  }

  public getereportType(): string {
    return this.ereportType;
  }
  public setereportType(value: string) {
    this.ereportType = value;
  }

  public getpersonID(): string {
    return this.personID;
  }
  public setpersonID(value: string) {
    this.personID = value;
  }

  public geteRepTypeKey(): string {
    return this.eRepTypeKey;
  }
  public seteRepTypeKey(value: string) {
    this.eRepTypeKey = value;
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }
}

interface Expenseinfo {
  expenseCategory: string;
  expenseDate: string;
  chargeType: string;
  businessUnit: string;
  expenseLocation: string;
  paymentMethod: string;
  rate: string;
  expenseAmount: string;
  expensecurrency: string;
  quantity: string;
}
