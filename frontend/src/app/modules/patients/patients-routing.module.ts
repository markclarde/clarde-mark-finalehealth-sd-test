import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListPageComponent } from './pages/patient-list-page/patient-list-page.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/patient-list-page/patient-list-page.component').then(m => m.PatientListPageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
