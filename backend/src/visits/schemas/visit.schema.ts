import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VisitDocument = Visit & Document;

export enum VisitType {
  HOME = 'Home',
  TELEHEALTH = 'Telehealth',
  CLINIC = 'Clinic',
}

@Schema({ timestamps: true })
export class Visit {
  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;

  @Prop({ required: true })
  visitDate: Date;

  @Prop()
  notes: string;

  @Prop({ enum: VisitType, required: true })
  visitType: VisitType;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
