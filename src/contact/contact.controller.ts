import { Request, Response } from 'express';
import { ContactService } from './contact.service';
import { ResponseFormatter } from '../common/response';
import { asyncHandler } from '../common/errorHandler';
import { parsePagination, validateEmail } from '../common/utils';

export class ContactController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { page, limit, skip } = parsePagination(req.query);
    const { status } = req.query;
    
    const filters = {
      ...(status && { status: status as string }),
    };

    const result = await this.contactService.findAll({
      page,
      limit,
      skip,
      filters,
    });

    res.status(200).json(
      ResponseFormatter.success(
        result.data,
        'Contact messages retrieved successfully',
        result.pagination
      )
    );
  });

  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const contact = await this.contactService.findById(id);

    if (!contact) {
      res.status(404).json(
        ResponseFormatter.notFound('Contact message not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.success(contact, 'Contact message retrieved successfully')
    );
  });

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validate email
    if (!validateEmail(req.body.email)) {
      res.status(400).json(
        ResponseFormatter.badRequest('Invalid email format')
      );
      return;
    }

    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.message) {
      res.status(400).json(
        ResponseFormatter.badRequest('Name, email, and message are required')
      );
      return;
    }

    const contact = await this.contactService.create(req.body);
    
    res.status(201).json(
      ResponseFormatter.created(contact, 'Contact message created successfully')
    );
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const contact = await this.contactService.update(id, req.body);

    if (!contact) {
      res.status(404).json(
        ResponseFormatter.notFound('Contact message not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.updated(contact, 'Contact message updated successfully')
    );
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deleted = await this.contactService.delete(id);

    if (!deleted) {
      res.status(404).json(
        ResponseFormatter.notFound('Contact message not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.deleted('Contact message deleted successfully')
    );
  });
}
