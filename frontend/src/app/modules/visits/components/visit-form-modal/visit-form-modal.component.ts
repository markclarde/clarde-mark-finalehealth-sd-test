import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitType } from '../../models/visit.model';
import { VisitService } from '../../services/visit.service';

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

  form: FormGroup;
  visitTypes = Object.values(VisitType);
  loading = false;

  constructor(private fb: FormBuilder, private visitService: VisitService) {
    this.form = this.fb.group({
      visitDate: ['', Validators.required],
      visitType: ['', Validators.required],
      notes: ['']
    });
  }

  submitForm() {
    if (this.form.invalid || !this.patientId) return;

    this.loading = true;

    this.visitService.createVisit(this.patientId, this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.submitted.emit(true);
      },
      error: (err: any) => {
        console.error('Failed to create visit:', err);
        this.loading = false;
        this.submitted.emit(false);
      }
    });
  }

  cancel() {
    this.cancelled.emit();
  }
}
