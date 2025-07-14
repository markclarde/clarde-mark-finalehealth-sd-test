import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async getAllPatients(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string
  ) {
    return this.patientsService.findAll(Number(page) || 1, Number(limit) || 10, search);
  }

  @Post()
  async createPatient(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Put(':id')
  async updatePatient(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
