import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface Particulars {
  id:number,
  admission:number,
  exam:number,
  computer:number,
  eclass:number,
  other:number,
  session_id:number,
  year:string
}
@Injectable({
  providedIn: 'root'
})
export class ApiServeService {

  constructor(private httpClient: HttpClient) { }

  register(data): Observable<any> {
    // return this.httpClient.post(`${this.apiURL}/customers/${id}`);
    return this.httpClient.post<any>(`${environment.apiUrl}/students/`, data)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  updateStudent(id,data): Observable<any> {    
    return this.httpClient.post<any>(`${environment.apiUrl}/updateStudent/${id}`, data)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  payFees(data): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/payfees/`, data)
    .pipe(
      catchError(this.errorHandler)
    )
  } 
  
  updateParticulars(data): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/updateParticulars/`, data)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  getParticulars(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/particulars`)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  getStudents(data): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/students/` +  data.session + "/" + data.class)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getStudent(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/student/` +  id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getStudentFeesDetails(session,id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/feedetails/` + session + "/" +  id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else if(typeof error !== undefined){
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
