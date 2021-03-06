import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from  '@angular/common/http';  
import { catchError } from 'rxjs/operators';

@Injectable()
export class CcupProvider 
{
  SERVER_URL: string = "http://192.168.2.157:8086/api/api/FileUploading/UploadFile"; 
  //SERVER_URL: string = "http://118.69.59.60:8086/api/api/FileUploading/UploadFile"; 

  constructor(public http: HttpClient) {}

  public uploadFormData(formData) 
  {
    return this.http.post<any>(this.SERVER_URL, formData,  { headers: new HttpHeaders({}) }).pipe(catchError(this.errorMgmt));
 
  }

  errorMgmt(error: HttpErrorResponse) 
  {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) 
    {
      // Get client-side error
      errorMessage = error.error.message;
    } 
    else 
    {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return errorMessage;
  }

}
