import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('auth') // Ikkada explicit ga 'auth' ani fix chestunnam
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Get('doctor/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  getDoctorProfile() {
    return { message: 'Welcome Doctor! This is a secure protected route.' };
  }

  @Get('patient/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  getPatientProfile() {
    return { message: 'Welcome Patient! This is a secure protected route.' };
  }
}
