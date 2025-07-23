import { Router } from 'express';
import { ExperienceController } from './experience.controller';
import { AuthMiddleware } from '../auth/auth.middleware';

const router = Router();
const experienceController = new ExperienceController();
const authMiddleware = new AuthMiddleware();

router.get('/', experienceController.getAll);
router.get('/:id', experienceController.getById);
router.post('/', authMiddleware.authenticate, authMiddleware.requireAdmin, experienceController.create);
router.put('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, experienceController.update);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, experienceController.delete);

export { router as experienceRoutes };
