import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visit, VisitType } from '../../models/visit.model';
import { VisitService } from '../../services/visit.service';
import { formatDate } from '@angular/common';
import { AbstractControl, ValidatorFn } from '@angular/forms';

function noPastDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputDate = new Date(control.value);
    const today = new Date();

    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate < today ? { pastDate: true } : null;
  };
}

@Component({
  selector: 'visit-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './visit-form-modal.component.html',
  styleUrls: ['./visit-form-modal.component.css']
})
export class VisitFormModalComponent {
  @Input() patientId!: string;
  @Output() submitted = new EventEmitter<boolean>();
  @Output() cancelled = new EventEmitter<void>();
  @Input() visitToEdit: Visit | null = null;

  form: FormGroup;
  visitTypes = Object.values(VisitType);
  loading = false;

  constructor(private fb: FormBuilder, private visitService: VisitService) {
    this.form = this.fb.group({
      visitDate: ['', [Validators.required, noPastDateValidator()]],
      visitType: ['', Validators.required],
      notes: ['']
    });
  }

  submitForm() {
    if (this.form.invalid || !this.patientId) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const request$ = this.visitToEdit
      ? this.visitService.updateVisit(this.visitToEdit._id, this.form.value)
      : this.visitService.createVisit(this.patientId, this.form.value);

    request$.subscribe({
      next: () => {
        this.submitted.emit(true);
        this.loading = false;
      },
      error: (err) => {
        console.error('Save failed:', err);
        this.submitted.emit(false);
        this.loading = false;
      }
    });
  }

  ngOnChanges(): void {
    if (this.visitToEdit) {
      const formattedDate = formatDate(this.visitToEdit.visitDate, 'yyyy-MM-dd', 'en-US');

      this.form.patchValue({
        visitDate: formattedDate,
        visitType: this.visitToEdit.visitType,
        notes: this.visitToEdit.notes
      });
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}
