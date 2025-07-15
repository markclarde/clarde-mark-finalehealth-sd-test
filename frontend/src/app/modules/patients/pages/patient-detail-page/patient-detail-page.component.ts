import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Visit } from '../../../visits/models/visit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-detail-page.component.html',
  styleUrls: ['./patient-detail-page.component.css']
})
export class PatientDetailPageComponent implements OnInit {
  patient: Patient | null = null;
  visits: Visit[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientService.getPatientWithVisits(id).subscribe({
        next: (res) => {
          this.patient = res.patient;
          this.visits = res.visits;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load patient visits', err);
          this.loading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/patients']);
  }
}
