import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from './schemas/visit.schema';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { Patient, PatientSchema } from 'src/patients/schemas/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Visit.name, schema: VisitSchema },
        { name: Patient.name, schema: PatientSchema }
      ]
    ),
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
