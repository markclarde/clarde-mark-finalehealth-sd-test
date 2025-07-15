import { Component, Output, EventEmitter } from '@angular/core';
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
export class PatientFormModalComponent {
  @Output() close = new EventEmitter<void>();

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

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.patientService.createPatient(this.patientForm.value).subscribe({
        next: () => {
          alert('Patient created successfully!');
          this.close.emit();
        },
        error: (err) => {
          console.error('Create error:', err);
          alert('Failed to create patient.');
        }
      });
    } else {
      this.patientForm.markAllAsTouched();
    }
  }
}
