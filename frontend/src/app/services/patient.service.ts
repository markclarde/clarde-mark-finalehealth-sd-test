import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patients'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getPatients(
    search: string = '',
    page: number = 1,
    limit: number = 5
  ): Observable<{ data: Patient[]; total: number }> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page)
      .set('limit', limit);

    return this.http.get<{ data: Patient[]; total: number }>(this.apiUrl, {
      params,
    });
  }
}
