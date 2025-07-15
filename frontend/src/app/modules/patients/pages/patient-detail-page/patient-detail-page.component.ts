import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Visit } from '../../../visits/models/visit.model';
import { Router } from '@angular/router';
import { VisitFormModalComponent } from '../../../visits/components/visit-form-modal/visit-form-modal.component';
import { VisitService } from '../../../visits/services/visit.service';

@Component({
  selector: 'app-patient-detail-page',
  standalone: true,
  imports: [CommonModule, VisitFormModalComponent],
  templateUrl: './patient-detail-page.component.html',
  styleUrls: ['./patient-detail-page.component.css']
})
export class PatientDetailPageComponent implements OnInit {
  patient: Patient | null = null;
  visits: Visit[] = [];
  loading = true;
  showModal = false;
  editingVisit: Visit | null = null;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    private visitService: VisitService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
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

  openVisitModal(visit: Visit | null = null) {
    this.editingVisit = visit;
    this.showModal = true;
  }

  closeVisitModal() {
    this.showModal = false;
  }

  handleVisitSubmitted(success: boolean) {
    if (success) this.loadData();
    this.closeVisitModal();
  }

  deleteVisit(visitId: string): void {
    if (confirm('Are you sure you want to delete this visit?')) {
      this.visitService.deleteVisit(visitId).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error('Failed to delete visit:', err)
      });
    }
  }
}
