import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vestido } from '../Vestido';
import { Response } from '../Response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VestidoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/vestidos`;

  constructor(private http: HttpClient) {}

  getVestidos(): Observable<Response<Vestido[]>> {
    return this.http.get<Response<Vestido[]>>(this.apiUrl);
  }

  getVestido(id: number): Observable<Response<Vestido>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Vestido>>(url);
  }

  createVestido(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
