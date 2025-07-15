import {
  IsEnum,
  IsOptional,
  IsString,
  IsMongoId,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { VisitType } from '../schemas/visit.schema';

export class CreateVisitDto {
  @IsMongoId({ message: 'Invalid patient ID.' })
  patientId: string;

  @IsDateString({}, { message: 'Visit date must be a valid date string.' })
  visitDate: string;

  @IsOptional()
  @IsString({ message: 'Notes must be a string.' })
  notes?: string;

  @IsEnum(VisitType, {
    message: 'Visit type must be one of: Home, Telehealth, Clinic.',
  })
  visitType: VisitType;

  @IsOptional()
  @IsBoolean({ message: 'isDeleted must be a boolean value.' })
  isDeleted?: boolean = false;
}
