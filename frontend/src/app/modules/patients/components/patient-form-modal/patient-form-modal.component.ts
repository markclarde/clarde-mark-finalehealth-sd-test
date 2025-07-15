import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-form-modal.component.html',
  styleUrls: ['./patient-form-modal.component.css']
})
export class PatientFormModalComponent implements OnChanges {
  @Input() patient: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  patientForm: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.patientForm.patchValue(this.patient);
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const formData = this.patientForm.value;

    if (this.patient && this.patient.id) {
      this.patientService.updatePatient(this.patient.id, formData).subscribe({
        next: () => {
          alert('Patient updated successfully!');
          this.close.emit();
        },
        error: (err) => {
          console.error('Update error:', err);
          alert('Failed to update patient.');
        }
      });
    } else {
      this.patientService.createPatient(formData).subscribe({
        next: () => {
          alert('Patient created successfully!');
          this.close.emit();
        },
        error: (err) => {
          console.error('Create error:', err);
          alert('Failed to create patient.');
        }
      });
    }
  }

  deletePatient(): void {
    const confirmDelete = confirm('Are you sure you want to delete this patient?');
    if (confirmDelete && this.patient?.id) {
      this.delete.emit(this.patient.id);
    }
  }
}
