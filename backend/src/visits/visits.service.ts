import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Visit, VisitDocument } from './schemas/visit.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Patient, PatientDocument } from '../patients/schemas/patient.schema';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>
  ) {}

  async create(createVisitDto: CreateVisitDto): Promise<Visit> {
    const { patientId, ...rest } = createVisitDto;

    if (!Types.ObjectId.isValid(patientId)) {
      throw new BadRequestException('Invalid patient ID format.');
    }

    const patient = await this.patientModel.findById(patientId).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found.`);
    }

    const visit = new this.visitModel({
      ...rest,
      patientId: new Types.ObjectId(patientId),
    });

    try {
      return await visit.save();
    } catch (error) {
      console.error('Error saving visit:', error);
      throw new BadRequestException('Failed to create visit. Please try again.');
    }
  }

  async findByPatient(patientId: string): Promise<{ patient: Patient; visits: Visit[] }> {
    if (!Types.ObjectId.isValid(patientId)) {
      throw new BadRequestException('Invalid patient ID format.');
    }

    const patient = await this.patientModel.findById(patientId).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found.`);
    }

    try {
      const visits = await this.visitModel.find({
        patientId: new Types.ObjectId(patientId)
      }).exec();

      return { patient, visits };
    } catch (error) {
      console.error('Error retrieving visits for patient:', error);
      throw new BadRequestException('Failed to retrieve visits. Please try again.');
    }
  }

  async update(id: string, updateVisitDto: UpdateVisitDto): Promise<Visit> {
    const updated = await this.visitModel.findByIdAndUpdate(id, updateVisitDto, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.visitModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
  }
}
