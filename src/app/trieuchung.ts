import { Injectable } from '@angular/core';

@Injectable()
export class Trieuchung 
{
  public id: number;
  public ten: string;
  public ck: boolean;

  constructor() 
  {
      this.id = 0;
      this.ten = "";
      this.ck = false;
  }

}