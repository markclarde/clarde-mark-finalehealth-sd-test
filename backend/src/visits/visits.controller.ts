import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get('/patients/:id/visits')
  getVisitsForPatient(@Param('id') patientId: string) {
    return this.visitsService.findByPatient(patientId);
  }

  @Post('/patients/:id/visits')
  createVisit(
    @Param('id') patientId: string,
    @Body() dto: Omit<CreateVisitDto, 'patientId'>
  ) {
    return this.visitsService.create({ ...dto, patientId });
  }

  @Put('/visits/:id')
  updateVisit(@Param('id') visitId: string, @Body() dto: UpdateVisitDto) {
    return this.visitsService.update(visitId, dto);
  }

  @Delete('/visits/:id')
  deleteVisit(@Param('id') visitId: string) {
    return this.visitsService.remove(visitId);
  }
}
