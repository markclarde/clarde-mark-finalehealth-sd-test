import { IsEnum, IsOptional, IsString, IsMongoId, IsDateString } from 'class-validator';
import { VisitType } from '../schemas/visit.schema';

export class CreateVisitDto {
  @IsMongoId()
  patientId: string;

  @IsDateString()
  visitDate: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsEnum(VisitType)
  visitType: VisitType;
}
