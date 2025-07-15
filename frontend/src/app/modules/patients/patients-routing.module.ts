import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/patient-list-page/patient-list-page.component').then(
        (m) => m.PatientListPageComponent
      )
  },
  {
    path: ':id/details',
    loadComponent: () =>
      import('./pages/patient-detail-page/patient-detail-page.component').then(
        (m) => m.PatientDetailPageComponent
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
