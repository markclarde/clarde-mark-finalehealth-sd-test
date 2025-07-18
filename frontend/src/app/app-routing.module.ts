import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/patients',
    pathMatch: 'full'
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then(m => m.PatientsModule)
  },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
