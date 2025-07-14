import { Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h1>Visit List Coming Soon</h1>`,
})
export class VisitComingSoonComponent {}

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientListComponent },
  { path: 'visits', component: VisitComingSoonComponent },
];
