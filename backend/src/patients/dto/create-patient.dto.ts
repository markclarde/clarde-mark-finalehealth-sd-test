import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString({ message: 'First name is required and must be a string.' })
  firstName: string;

  @IsString({ message: 'Last name is required and must be a string.' })
  lastName: string;

  @IsDateString({}, { message: 'Date of birth must be a valid date.' })
  dob: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsString({ message: 'Phone number is required and must be a string.' })
  phoneNumber: string;

  @IsString({ message: 'Address is required and must be a string.' })
  address: string;
}
