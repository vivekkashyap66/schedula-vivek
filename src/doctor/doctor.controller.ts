import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // POST: Create a new doctor profile
  @Post('profile/:userId')
  createProfile(
    @Param('userId') userId: string,
    @Body() profileData: Partial<Doctor>,
  ) {
    return this.doctorService.createProfile(userId, profileData);
  }

  // GET: Fetch an existing doctor profile
  @Get('profile/:userId')
  getProfile(@Param('userId') userId: string) {
    return this.doctorService.getProfile(userId);
  }

  // PUT: Update an existing doctor profile
  @Put('profile/:userId')
  updateProfile(
    @Param('userId') userId: string,
    @Body() updateData: Partial<Doctor>,
  ) {
    return this.doctorService.updateProfile(userId, updateData);
  }
}
