import { Injectable } from '@angular/core';

@Injectable()
export class Inf {

  static mainUrl: string = 'http://192.168.2.157:8086/kbyt/z.asmx';

  public loggedUsername: string;
  public loggedPassword: string;

  constructor() {
      this.loggedUsername = "";
      this.loggedPassword = "";
  }
  public setLoggedUsername(name: string)
  {
      this.loggedUsername = name;
  }
  public getLoggedUsername():string
  {
      return this.loggedUsername;
  }
  public setLoggedPassword(pass: string) {
      this.loggedPassword = pass;
  }
  public getLoggedPassword(): string {
      return this.loggedPassword;
  }
  

  static getCurrentDatetimeWithTimeZone(): string
  {
      var result: string = '';
      var date = new Date();
      result = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
      return result;
  }
  static getCurrentDatetimeWithTimeZoneSubtractSevenDays(): string {
      var result: string = '';
      var date = new Date();
      date.setDate(date.getDate() - 7);
      result = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
      return result;
  }

  // Cac bang danh muc
  static trieuchungSelectAll(): string {
      var addString: string = '';
      var result = this.mainUrl + '/trieuchungSelectAll' + addString;
      return result;
  }
  static tiepxucSelectAll(): string {
      var addString: string = '';
      var result = this.mainUrl + '/tiepxucSelectAll' + addString;
      return result;
  }
  static benhSelectAll(): string {
    var addString: string = '';
    var result = this.mainUrl + '/benhSelectAll' + addString;
    return result;
  }

  static loginUrl(username: string, password: string): string {
      var addString: string = '?username=' + username + '&password=' + password;
      var result = this.mainUrl + '/Login' + addString;
      return result;
  }

  
  static workUpdate(username: string, password: string, id: number,
      workname: string, detail: string, progress: number, comment: string, closed: boolean,
      started_date: string, ended_date: string
  ): string {
      var addString: string = '?username=' + username + '&password=' + password
          + '&id=' + id + '&workname=' + workname
          + '&detail=' + detail
          + '&progress=' + progress
          + '&comment=' + comment
          + '&closed=' + closed
          + '&started_date=' + started_date
          + '&ended_date=' + ended_date

          ;
      var result = this.mainUrl + '/workUpdate' + addString;
      return result;
  }

  static workInsert(username: string, password: string,
      workname: string, detail: string, progress: number, comment: string, closed: boolean,
      started_date: string, ended_date: string
  ): string {
      var addString: string = '?username=' + username + '&password=' + password
          + '&workname=' + workname
          + '&detail=' + detail
          + '&progress=' + progress
          + '&comment=' + comment
          + '&closed=' + closed
          + '&started_date=' + started_date
          + '&ended_date=' + ended_date

          ;
      var result = this.mainUrl + '/workInsert' + addString;
      return result;
  }

  
}
