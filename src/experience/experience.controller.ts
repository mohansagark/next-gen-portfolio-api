import { Request, Response } from 'express';
import { ExperienceService } from './experience.service';
import { ResponseFormatter } from '../common/response';
import { asyncHandler } from '../common/errorHandler';
import { parsePagination } from '../common/utils';

export class ExperienceController {
  private experienceService: ExperienceService;

  constructor() {
    this.experienceService = new ExperienceService();
  }

  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { page, limit, skip } = parsePagination(req.query);
    
    const result = await this.experienceService.findAll({
      page,
      limit,
      skip,
    });

    res.status(200).json(
      ResponseFormatter.success(
        result.data,
        'Experience records retrieved successfully',
        result.pagination
      )
    );
  });

  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const experience = await this.experienceService.findById(id);

    if (!experience) {
      res.status(404).json(
        ResponseFormatter.notFound('Experience record not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.success(experience, 'Experience record retrieved successfully')
    );
  });

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const experience = await this.experienceService.create(req.body);
    
    res.status(201).json(
      ResponseFormatter.created(experience, 'Experience record created successfully')
    );
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const experience = await this.experienceService.update(id, req.body);

    if (!experience) {
      res.status(404).json(
        ResponseFormatter.notFound('Experience record not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.updated(experience, 'Experience record updated successfully')
    );
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deleted = await this.experienceService.delete(id);

    if (!deleted) {
      res.status(404).json(
        ResponseFormatter.notFound('Experience record not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.deleted('Experience record deleted successfully')
    );
  });
}
