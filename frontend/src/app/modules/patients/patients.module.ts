import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientListPageComponent } from './pages/patient-list-page/patient-list-page.component';
import { PatientDetailPageComponent } from './pages/patient-detail-page/patient-detail-page.component';
import { PatientFormModalComponent } from './components/patient-form-modal/patient-form-modal.component';
import { VisitFormModalComponent } from '../visits/components/visit-form-modal/visit-form-modal.component';

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
    PatientDetailPageComponent,
    VisitFormModalComponent
  ]
})
export class PatientsModule { }
