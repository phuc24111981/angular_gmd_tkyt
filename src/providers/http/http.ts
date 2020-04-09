import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvider 
{
  data:any;
  constructor(public http: Http) 
  {
    //console.log('Hello HttpProvider Provider');
  }

  load(url:string)
  {
    return new Promise(resolve => 
    {
      this.http.get(url).map(res => res.json())
      .subscribe
      (
        data => 
        {
          this.data = data;
          resolve(this.data);
        },
        error => 
        {
          //console.log(error); 
          resolve('e');           
        }
      ); 
      
    });
  }

}
