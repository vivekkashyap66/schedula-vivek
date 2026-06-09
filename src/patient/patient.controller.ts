import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // POST: Create a new patient profile
  @Post('profile/:userId')
  createProfile(
    @Param('userId') userId: string,
    @Body() profileData: Partial<Patient>,
  ) {
    return this.patientService.createProfile(userId, profileData);
  }

  // GET: Fetch an existing patient profile
  @Get('profile/:userId')
  getProfile(@Param('userId') userId: string) {
    return this.patientService.getProfile(userId);
  }

  // PUT: Update an existing patient profile
  @Put('profile/:userId')
  updateProfile(
    @Param('userId') userId: string,
    @Body() updateData: Partial<Patient>,
  ) {
    return this.patientService.updateProfile(userId, updateData);
  }
}
