import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async createProfile(
    userId: string,
    profileData: Partial<Patient>,
  ): Promise<Patient> {
    const existingProfile = await this.patientRepository.findOne({
      where: { userId },
    });
    if (existingProfile) {
      throw new ConflictException(
        'Patient profile already exists for this user.',
      );
    }

    const newProfile = this.patientRepository.create({
      ...profileData,
      userId,
    });
    return this.patientRepository.save(newProfile);
  }

  async getProfile(userId: string): Promise<Patient> {
    const profile = await this.patientRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Patient profile not found.');
    }
    return profile;
  }

  async updateProfile(
    userId: string,
    updateData: Partial<Patient>,
  ): Promise<Patient> {
    const profile = await this.getProfile(userId);
    Object.assign(profile, updateData);
    return this.patientRepository.save(profile);
  }
}
