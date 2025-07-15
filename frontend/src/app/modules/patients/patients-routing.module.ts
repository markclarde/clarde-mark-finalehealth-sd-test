import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListPageComponent } from './pages/patient-list-page/patient-list-page.component';

const routes: Routes = [
  { path: '', component: PatientListPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
