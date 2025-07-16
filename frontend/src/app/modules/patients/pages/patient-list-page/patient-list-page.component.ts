import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Router } from '@angular/router';
import { PatientFormModalComponent } from '../../components/patient-form-modal/patient-form-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-patient-list-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PatientFormModalComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './patient-list-page.component.html',
  styleUrls: ['./patient-list-page.component.css']
})
export class PatientListPageComponent implements OnInit {
  patients: Patient[] = [];
  loading = true;
  searchQuery = '';
  page = 1;
  limit = 10;
  total = 0;
  totalPages = 1;
  showModal = false;
  selectedPatient: Patient | null = null;
  displayedColumns: string[] = ['name', 'dob', 'email', 'phone', 'address', 'actions'];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.loading = true;
    this.patientService.getPatients(this.page, this.limit, this.searchQuery).subscribe({
      next: (res) => {
        this.patients = res.data.map((p: any) => ({
          ...p,
          id: p._id
        }));
        this.total = res.meta.total;
        this.totalPages = res.meta.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch patients', err);
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.page = 1;
    this.fetchPatients();
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    this.fetchPatients();
  }

  onCreate(): void {
    this.selectedPatient = null;
    this.showModal = true;
  }

  onEdit(patient: Patient): void {
    this.selectedPatient = patient;
    this.showModal = true;
  }

  onModalClose(): void {
    this.selectedPatient = null;
    this.showModal = false;
    this.fetchPatients();
  }

  onView(id: string): void {
    this.router.navigate(['/patients', id, 'details']);
  }

  onDelete(id: string): void {
    if (!id) {
      console.warn('Patient ID is required for deletion');
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this patient?');
    if (confirmDelete) {
      this.loading = true;
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          alert('Patient deleted successfully.');
          this.fetchPatients();
        },
        error: (err) => {
          console.error('Failed to delete patient:', err);
          alert('An error occurred while deleting the patient.');
          this.loading = false;
        }
      });
    }
  }

  onModalDelete(id: string): void {
    this.showModal = false;
    this.loading = true;
    this.patientService.deletePatient(id).subscribe({
      next: () => {
        alert('Patient deleted successfully.');
        this.selectedPatient = null;
        this.fetchPatients();
      },
      error: (err) => {
        console.error('Failed to delete patient:', err);
        alert('An error occurred while deleting the patient.');
        this.loading = false;
      }
    });
  }
}
