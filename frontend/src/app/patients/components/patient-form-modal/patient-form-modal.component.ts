import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { finalize } from 'rxjs/operators';

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
  loading = false;

  private capitalizeWords(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

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

    this.loading = true;

    const formData = this.patientForm.value;

    formData.firstName = this.capitalizeWords(formData.firstName);
    formData.lastName = this.capitalizeWords(formData.lastName);
    formData.address = this.capitalizeWords(formData.address);

    const request$ = this.patient && this.patient.id
      ? this.patientService.updatePatient(this.patient.id, formData)
      : this.patientService.createPatient(formData);

    request$
      .pipe(finalize(() => this.loading = false))
      .subscribe({
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
