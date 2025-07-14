import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Visit, VisitDocument } from './schemas/visit.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>
  ) {}

  async create(createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.visitModel.create(createVisitDto);
  }

  async findByPatient(patientId: string): Promise<Visit[]> {
    return this.visitModel.find({ patientId: new Types.ObjectId(patientId) }).exec();
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
