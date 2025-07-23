import { prisma } from '../common/database';
import { calculatePagination } from '../common/utils';

export interface EducationData {
  institution: string;
  degree: string;
  field?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  grade?: string;
  location?: string;
  logoUrl?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export class EducationService {
  async findAll(options: PaginationOptions) {
    const { page, limit, skip } = options;

    const [education, total] = await Promise.all([
      prisma.education.findMany({
        where: { isActive: true },
        orderBy: { startDate: 'desc' },
        skip,
        take: limit,
      }),
      prisma.education.count({
        where: { isActive: true },
      }),
    ]);

    const pagination = calculatePagination(total, page, limit);

    return {
      data: education,
      pagination,
    };
  }

  async findById(id: string) {
    return prisma.education.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async create(data: EducationData) {
    return prisma.education.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
  }

  async update(id: string, data: Partial<EducationData>) {
    const existing = await this.findById(id);
    if (!existing) return null;

    return prisma.education.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    const existing = await this.findById(id);
    if (!existing) return null;

    // Soft delete
    return prisma.education.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
