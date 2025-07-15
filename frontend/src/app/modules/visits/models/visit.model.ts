export interface Visit {
  _id: string;
  patientId: string;
  visitDate: string;
  notes?: string;
  visitType: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}