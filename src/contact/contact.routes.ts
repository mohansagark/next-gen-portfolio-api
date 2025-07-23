import { Router } from 'express';
import { ContactController } from './contact.controller';
import { AuthMiddleware } from '../auth/auth.middleware';

const router = Router();
const contactController = new ContactController();
const authMiddleware = new AuthMiddleware();

router.get('/', contactController.getAll);
router.get('/:id', contactController.getById);
router.post('/', authMiddleware.authenticate, authMiddleware.requireAdmin, contactController.create);
router.put('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, contactController.update);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, contactController.delete);

export { router as contactRoutes };
