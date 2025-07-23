import { Router } from 'express';
import { ProjectController } from './project.controller';
import { AuthMiddleware } from '../auth/auth.middleware';

const router = Router();
const projectController = new ProjectController();
const authMiddleware = new AuthMiddleware();

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', authMiddleware.authenticate, authMiddleware.requireAdmin, projectController.create);
router.put('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, projectController.update);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, projectController.delete);

export { router as projectRoutes };
