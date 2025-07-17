import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientListPageComponent } from './pages/patient-list-page/patient-list-page.component';
import { PatientDetailPageComponent } from './pages/patient-detail-page/patient-detail-page.component';
import { PatientFormModalComponent } from './components/patient-form-modal/patient-form-modal.component';
import { VisitFormModalComponent } from '../visits/components/visit-form-modal/visit-form-modal.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    PatientListPageComponent,
    PatientFormModalComponent,
    PatientDetailPageComponent,
    VisitFormModalComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ],
  declarations: [
  ]
})
export class PatientsModule { }
