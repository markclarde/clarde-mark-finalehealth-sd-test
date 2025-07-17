export enum VisitType {
  HOME = 'Home',
  TELEHEALTH = 'Telehealth',
  CLINIC = 'Clinic'
}

export interface Visit {
  _id: string;
  patientId: string;
  visitDate: string;
  notes?: string;
  visitType: VisitType;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
