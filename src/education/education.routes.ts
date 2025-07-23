import { Router } from 'express';
import { EducationController } from './education.controller';
import { AuthMiddleware } from '../auth/auth.middleware';

const router = Router();
const educationController = new EducationController();
const authMiddleware = new AuthMiddleware();

router.get('/', educationController.getAll);
router.get('/:id', educationController.getById);
router.post('/', authMiddleware.authenticate, authMiddleware.requireAdmin, educationController.create);
router.put('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, educationController.update);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, educationController.delete);

export { router as educationRoutes };
