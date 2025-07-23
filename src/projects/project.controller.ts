import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { ResponseFormatter } from '../common/response';
import { asyncHandler } from '../common/errorHandler';
import { parsePagination } from '../common/utils';

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { page, limit, skip } = parsePagination(req.query);
    const { featured, category } = req.query;
    
    const filters = {
      ...(featured && { featured: featured === 'true' }),
      ...(category && { category: category as string }),
    };

    const result = await this.projectService.findAll({
      page,
      limit,
      skip,
      filters,
    });

    res.status(200).json(
      ResponseFormatter.success(
        result.data,
        'Projects retrieved successfully',
        result.pagination
      )
    );
  });

  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const project = await this.projectService.findById(id);

    if (!project) {
      res.status(404).json(
        ResponseFormatter.notFound('Project not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.success(project, 'Project retrieved successfully')
    );
  });

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const project = await this.projectService.create(req.body);
    
    res.status(201).json(
      ResponseFormatter.created(project, 'Project created successfully')
    );
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const project = await this.projectService.update(id, req.body);

    if (!project) {
      res.status(404).json(
        ResponseFormatter.notFound('Project not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.updated(project, 'Project updated successfully')
    );
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deleted = await this.projectService.delete(id);

    if (!deleted) {
      res.status(404).json(
        ResponseFormatter.notFound('Project not found')
      );
      return;
    }

    res.status(200).json(
      ResponseFormatter.deleted('Project deleted successfully')
    );
  });
}
