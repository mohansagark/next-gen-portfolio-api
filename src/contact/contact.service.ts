import { prisma } from '../common/database';
import { calculatePagination, sanitizeString } from '../common/utils';

export interface ContactData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  status?: 'unread' | 'read' | 'replied';
}

export interface ContactFilters {
  status?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
  filters?: ContactFilters;
}

export class ContactService {
  async findAll(options: PaginationOptions) {
    const { page, limit, skip, filters = {} } = options;

    const where = {
      isActive: true,
      ...filters,
    };

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contact.count({ where }),
    ]);

    const pagination = calculatePagination(total, page, limit);

    return {
      data: contacts,
      pagination,
    };
  }

  async findById(id: string) {
    return prisma.contact.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async create(data: ContactData) {
    return prisma.contact.create({
      data: {
        ...data,
        name: sanitizeString(data.name),
        message: sanitizeString(data.message),
        subject: data.subject ? sanitizeString(data.subject) : null,
        status: data.status || 'unread',
      },
    });
  }

  async update(id: string, data: Partial<ContactData>) {
    const existing = await this.findById(id);
    if (!existing) return null;

    return prisma.contact.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    const existing = await this.findById(id);
    if (!existing) return null;

    // Soft delete
    return prisma.contact.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
