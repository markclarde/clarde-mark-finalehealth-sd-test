import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Visit } from '../../visits/models/visit.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) {}

  getPatients(page = 1, limit = 10, search = ''): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('search', search);

    return this.http.get(this.apiUrl, { params });
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getPatientWithVisits(id: string, page = 1, limit = 8): Observable<{
    patient: Patient;
    visits: Visit[];
    totalVisits: number;
    totalPages: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http
      .get<{
        patient: any;
        visits: Visit[];
        totalVisits: number;
        totalPages: number;
      }>(`${this.apiUrl}/${id}/visits`, { params })
      .pipe(
        map((res) => ({
          patient: { ...res.patient, id: res.patient._id },
          visits: res.visits,
          totalVisits: res.totalVisits,
          totalPages: res.totalPages
        }))
      );
  }

  createPatient(data: {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    phoneNumber: string;
    address: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updatePatient(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}