import { Controller, Post, Get, Put, Body, Param, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // ==========================================
  // DAY 4: DOCTOR DISCOVERY APIs
  // ==========================================

  // GET /doctor (Fetch list with Search, Filter, Pagination)
  @Get()
  getAllDoctors(@Query() query: any) {
    return this.doctorService.findAllDoctors(query);
  }

  // GET /doctor/:id (Fetch single doctor details by ID)
  @Get(':id')
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(id);
  }

  // ==========================================
  // DAY 3: PROFILE APIs
  // ==========================================

  @Post('profile/:userId')
  createProfile(
    @Param('userId') userId: string,
    @Body() profileData: Partial<Doctor>,
  ) {
    return this.doctorService.createProfile(userId, profileData);
  }

  @Get('profile/:userId')
  getProfile(@Param('userId') userId: string) {
    return this.doctorService.getProfile(userId);
  }

  @Put('profile/:userId')
  updateProfile(
    @Param('userId') userId: string,
    @Body() updateData: Partial<Doctor>,
  ) {
    return this.doctorService.updateProfile(userId, updateData);
  }
}
