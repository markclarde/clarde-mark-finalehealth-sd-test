import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visit } from '../models/visit.model';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  createVisit(patientId: string, visitData: Omit<Visit, '_id' | 'createdAt' | 'updatedAt'>): Observable<Visit> {
    return this.http.post<Visit>(`${this.baseUrl}patients/${patientId}/visits`, {
      ...visitData,
      patientId
    });
  }

  getVisitsByPatient(patientId: string): Observable<{ patient: any; visits: Visit[] }> {
    return this.http.get<{ patient: any; visits: Visit[] }>(`${this.baseUrl}patients/${patientId}/visits`);
  }
}
