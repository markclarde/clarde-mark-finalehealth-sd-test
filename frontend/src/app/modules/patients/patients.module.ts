import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientListPageComponent } from './pages/patient-list-page/patient-list-page.component';
import { PatientFormModalComponent } from './components/patient-form-modal/patient-form-modal.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    PatientListPageComponent,
    PatientFormModalComponent,
  ]
})
export class PatientsModule { }
