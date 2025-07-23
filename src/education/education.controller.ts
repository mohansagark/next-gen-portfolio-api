import { Request, Response } from 'express';
import { EducationService } from './education.service';
import { ResponseFormatter } from '../common/response';
import { asyncHandler } from '../common/errorHandler';
import { parsePagination } from '../common/utils';

export class EducationController {
  private educationService: EducationService;

  constructor() {
    this.educationService = new EducationService();
  }

  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { page, limit, skip } = parsePagination(req.query);
    
    const result = await this.educationService.findAll({
      page,
      limit,
      skip,
    });

    res.status(200).json(
      ResponseFormatter.success(
        result.data,
        'Education records retrieved successfully',
        result.pagination
      )
    );
  });

  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const education = await this.educationService.findById(id);

    if (!education) {
      res.status(404).json(
        ResponseFormatter.notFound('Education record not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.success(education, 'Education record retrieved successfully')
    );
  });

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const education = await this.educationService.create(req.body);
    
    res.status(201).json(
      ResponseFormatter.created(education, 'Education record created successfully')
    );
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const education = await this.educationService.update(id, req.body);

    if (!education) {
      res.status(404).json(
        ResponseFormatter.notFound('Education record not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.updated(education, 'Education record updated successfully')
    );
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deleted = await this.educationService.delete(id);

    if (!deleted) {
      res.status(404).json(
        ResponseFormatter.notFound('Education record not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.deleted('Education record deleted successfully')
    );
  });
}
