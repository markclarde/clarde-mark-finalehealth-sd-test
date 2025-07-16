import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator: disallow future dates
function noFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputDate = new Date(control.value);
    const today = new Date();
    return inputDate > today ? { futureDate: true } : null;
  };
}

@Component({
  selector: 'app-patient-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-form-modal.component.html',
  styleUrls: ['./patient-form-modal.component.css']
})
export class PatientFormModalComponent implements OnChanges {
  @Input() patient: any = null;
  @Output() delete = new EventEmitter<string>();
  @Output() close = new EventEmitter<'confirm' | 'cancel'>();

  patientForm: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', [Validators.required, noFutureDateValidator()]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(09\d{9}|\+639\d{9})$/)
        ]
      ],
      address: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.patientForm.patchValue(this.patient);
    }
  }

  closeModal(): void {
    this.close.emit('cancel');
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const formData = this.patientForm.value;

    const request$ = this.patient && this.patient.id
      ? this.patientService.updatePatient(this.patient.id, formData)
      : this.patientService.createPatient(formData);

    request$.subscribe({
      next: () => {
        this.close.emit('confirm');
      },
      error: (err) => {
        console.error('Submit error:', err);

        if (
          err?.error?.message &&
          err.error.message.includes('email') &&
          err.status === 400
        ) {
          this.patientForm.get('email')?.setErrors({ emailExists: true });
        }
      }
    });
  }

  deletePatient(): void {
    if (this.patient?.id) {
      this.delete.emit(this.patient.id);
    }
  }
}
