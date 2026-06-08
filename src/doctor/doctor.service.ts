import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async createProfile(
    userId: string,
    profileData: Partial<Doctor>,
  ): Promise<Doctor> {
    // Edge Case: Prevent duplicate profile creation
    const existingProfile = await this.doctorRepository.findOne({
      where: { userId },
    });
    if (existingProfile) {
      throw new ConflictException(
        'Doctor profile already exists for this user.',
      );
    }

    const newProfile = this.doctorRepository.create({ ...profileData, userId });
    return this.doctorRepository.save(newProfile);
  }

  async getProfile(userId: string): Promise<Doctor> {
    // Edge Case: Return error if profile not found
    const profile = await this.doctorRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Doctor profile not found.');
    }
    return profile;
  }

  async updateProfile(
    userId: string,
    updateData: Partial<Doctor>,
  ): Promise<Doctor> {
    const profile = await this.getProfile(userId);
    Object.assign(profile, updateData);
    return this.doctorRepository.save(profile);
  }
}
