import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  private _getQuery(type: string, params?: HttpParams): Observable<Object> {
    const headers = new HttpHeaders({
      get_type: type
    });

    if (!params) { params = new HttpParams({}); }

    return this.http.get(`${environment.apiPath}/api/schedule`, { headers, params });
  }

  private _postQuery(data: any, type: string): Observable<Object> {
    const headers = new HttpHeaders({
      post_type: type
    });

    return this.http.post(`${environment.apiPath}/api/schedule`, data, { headers });
  }

  private _putQuery(idx: number, data: any, type: string): Observable<Object> {
    const headers = new HttpHeaders({
      put_Type: type
    });

    return this.http.put(`${environment.apiPath}/api/schedule/${idx}`, data, { headers });
  }

  private _deleteQuery(idx: number, type: string): Observable<Object> {
    const headers = new HttpHeaders({
      put_Type: type
    });

    return this.http.delete(`${environment.apiPath}/api/schedule/${idx}`,{headers});
  }


  public postSchedule(data: any): Observable<Object> {
    return this._postQuery(data, 'schedule');
  }

}
