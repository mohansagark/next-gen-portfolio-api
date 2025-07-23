import { prisma } from '../common/database';
import { calculatePagination } from '../common/utils';

export interface ExperienceData {
  company: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologies?: string[];
  achievements?: string[];
  companyUrl?: string;
  logoUrl?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export class ExperienceService {
  async findAll(options: PaginationOptions) {
    const { page, limit, skip } = options;

    const [experience, total] = await Promise.all([
      prisma.experience.findMany({
        where: { isActive: true },
        orderBy: { startDate: 'desc' },
        skip,
        take: limit,
      }),
      prisma.experience.count({
        where: { isActive: true },
      }),
    ]);

    const pagination = calculatePagination(total, page, limit);

    return {
      data: experience,
      pagination,
    };
  }

  async findById(id: string) {
    return prisma.experience.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async create(data: ExperienceData) {
    return prisma.experience.create({
      data: {
        ...data,
        technologies: data.technologies || [],
        achievements: data.achievements || [],
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
  }

  async update(id: string, data: Partial<ExperienceData>) {
    const existing = await this.findById(id);
    if (!existing) return null;

    return prisma.experience.update({
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
    return prisma.experience.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
