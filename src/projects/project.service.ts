import { prisma } from '../common/database';
import { calculatePagination } from '../common/utils';

export interface ProjectData {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  images?: string[];
  startDate: Date;
  endDate?: Date;
  status?: 'completed' | 'in-progress' | 'planned';
  featured?: boolean;
  category?: string;
  order?: number;
}

export interface ProjectFilters {
  featured?: boolean;
  category?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
  filters?: ProjectFilters;
}

export class ProjectService {
  async findAll(options: PaginationOptions) {
    const { page, limit, skip, filters = {} } = options;

    const where = {
      isActive: true,
      ...filters,
    };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: [{ order: 'asc' }, { startDate: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    const pagination = calculatePagination(total, page, limit);

    return {
      data: projects,
      pagination,
    };
  }

  async findById(id: string) {
    return prisma.project.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async create(data: ProjectData) {
    return prisma.project.create({
      data: {
        ...data,
        technologies: data.technologies,
        images: data.images || [],
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
  }

  async update(id: string, data: Partial<ProjectData>) {
    const existing = await this.findById(id);
    if (!existing) return null;

    return prisma.project.update({
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
    return prisma.project.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
