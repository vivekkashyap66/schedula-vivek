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

  // ==========================================
  // DAY 4: DOCTOR DISCOVERY APIs
  // ==========================================

  async findAllDoctors(query: any) {
    const { specialization, search, page = 1, limit = 10 } = query;

    // Edge Case: Prevent negative or 0 values for pagination
    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.max(1, Number(limit) || 10);
    const skip = (pageNumber - 1) * limitNumber;

    // TypeORM QueryBuilder for flexible searching and filtering
    const qb = this.doctorRepository.createQueryBuilder('doctor');

    // 1. Filter by Specialization
    if (specialization) {
      qb.andWhere('doctor.specialization = :specialization', {
        specialization,
      });
    }

    // 2. Search by Doctor Name (Flexible Partial Match)
    if (search) {
      qb.andWhere('doctor.fullName LIKE :search', { search: `%${search}%` });
    }

    // Execute query with pagination limits
    const [data, total] = await qb
      .skip(skip)
      .take(limitNumber)
      .getManyAndCount();

    return {
      data,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber) || 1,
    };
  }

  async getDoctorById(id: string): Promise<Doctor> {
    try {
      const doctor = await this.doctorRepository.findOne({ where: { id } });
      if (!doctor) {
        throw new NotFoundException('Doctor not found.');
      }
      return doctor;
    } catch (error) {
      // Edge Case: Handle invalid/malformed UUID formats gracefully
      throw new NotFoundException(
        'Invalid Doctor ID format or Doctor not found.',
      );
    }
  }

  // ==========================================
  // DAY 3: PROFILE APIs (Don't Touch)
  // ==========================================

  async createProfile(
    userId: string,
    profileData: Partial<Doctor>,
  ): Promise<Doctor> {
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
    const profile = await this.doctorRepository.findOne({ where: { userId } });
    if (!profile) throw new NotFoundException('Doctor profile not found.');
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
