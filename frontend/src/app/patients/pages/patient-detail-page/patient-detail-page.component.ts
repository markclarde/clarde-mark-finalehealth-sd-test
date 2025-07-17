import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Visit } from '../../../visits/models/visit.model';
import { Router } from '@angular/router';
import { VisitFormModalComponent } from '../../../visits/components/visit-form-modal/visit-form-modal.component';
import { VisitService } from '../../../visits/services/visit.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../shared/components/success-dialog/success-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-patient-detail-page',
  standalone: true,
  imports: [
    CommonModule, 
    VisitFormModalComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './patient-detail-page.component.html',
  styleUrls: ['./patient-detail-page.component.css']
})
export class PatientDetailPageComponent implements OnInit {
  patient: Patient | null = null;
  visits: Visit[] = [];
  loading = true;
  showModal = false;
  editingVisit: Visit | null = null;

  private destroy$ = new Subject<void>();
  private loadTrigger$ = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    private visitService: VisitService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTrigger$
        .pipe(
          tap(() => this.loading = true),
          switchMap((patientId) =>
            this.patientService.getPatientWithVisits(patientId)
          ),
          takeUntil(this.destroy$)
        )
        .subscribe({
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

      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTrigger$.next(id);
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
    if (success) {
      this.loadData();

      this.dialog.open(SuccessDialogComponent, {
        data: {
          title: this.editingVisit ? 'Visit Updated' : 'Visit Created',
          message: this.editingVisit
            ? 'The visit was successfully updated.'
            : 'The visit was successfully created.'
        }
      });
    }

    this.closeVisitModal();
  }

  deleteVisit(visitId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Visit',
        message: 'Are you sure you want to delete this visit?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.visitService.deleteVisit(visitId).subscribe({
          next: () => {
            this.dialog.open(SuccessDialogComponent, {
              data: {
                title: 'Visit Deleted',
                message: 'The visit was successfully deleted.'
              }
            });

            this.loadData();
          },
          error: (err) => {
            console.error('Failed to delete visit:', err);
          }
        });
      }
    });
  }
}
