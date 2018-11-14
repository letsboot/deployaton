import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getName(): Observable<string> {
    return this.http.get(`${environment.url}/name`, {responseType: 'text'});
  }

  getNameForService(service: string): Observable<string> {
    return this.http.get(`${service}/name`, {responseType: 'text'});
  }

}
