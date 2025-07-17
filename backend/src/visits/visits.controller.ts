import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post('/patients/:id/visits')
  createVisit(
    @Param('id') patientId: string,
    @Body() dto: Omit<CreateVisitDto, 'patientId'>
  ) {
    return this.visitsService.create({ ...dto, patientId });
  }

  @Get('/patients/:id/visits')
  getVisitsForPatient(
    @Param('id') patientId: string,
    @Query('page') page = '1'
  ) {
    const pageNumber = parseInt(page, 10);
    return this.visitsService.findByPatient(patientId, pageNumber);
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
