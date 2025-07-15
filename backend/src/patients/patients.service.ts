import { 
  Injectable, 
  NotFoundException, 
  InternalServerErrorException, 
  BadRequestException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}

  async findAll(page = 1, limit = 10, search = ''): Promise<any> {
    const finalLimit = Math.min(limit, 100);
    const skip = (page - 1) * finalLimit;

    const baseFilter: any = { isDeleted: false };

    if (search) {
      baseFilter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const [patients, total] = await Promise.all([
      this.patientModel.find(baseFilter).skip(skip).limit(finalLimit).exec(),
      this.patientModel.countDocuments(baseFilter),
    ]);

    return {
      message: 'Patients retrieved successfully.',
      data: patients,
      meta: {
        total,
        page,
        limit: finalLimit,
        totalPages: Math.ceil(total / finalLimit),
      },
    };
  }

  async create(dto: CreatePatientDto): Promise<any> {
    try {
      if (!isEmail(dto.email)) {
        throw new BadRequestException('Invalid email format.');
      }

      const existingPatient = await this.patientModel.findOne({ email: dto.email });
      if (existingPatient) {
        throw new BadRequestException('A patient with this email already exists.');
      }

      const newPatient = await this.patientModel.create(dto);

      return {
        message: 'Patient created successfully.',
        data: newPatient,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Failed to create patient. ' + error.message);
    }
  }

  async update(id: string, dto: UpdatePatientDto): Promise<any> {
    try {
      const patient = await this.patientModel.findOne({ _id: id, isDeleted: false });
      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found or has been deleted.`);
      }

      if (dto.email) {
        const existing = await this.patientModel.findOne({ email: dto.email }) as PatientDocument | null;

        if (existing && existing._id && (existing._id as any).equals && !(existing._id as any).equals(id)) {
          throw new BadRequestException('Another patient is already using this email.');
        }
      }

      const updated = await this.patientModel.findByIdAndUpdate(id, dto, { new: true });

      if (!updated) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      return {
        message: 'Patient updated successfully.',
        data: updated,
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to update patient. ' + error.message);
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const deleted = await this.patientModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
      );

      if (!deleted) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      return {
        message: 'Patient deleted successfully.',
        data: deleted,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete patient. ' + error.message);
    }
  }
}
