import { Router } from 'express';
import { ContactController } from './contact.controller';
import { AuthMiddleware } from '../auth/auth.middleware';

const router = Router();
const contactController = new ContactController();
const authMiddleware = new AuthMiddleware();

router.get(
  '/',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  contactController.getAll
);
router.get(
  '/:id',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  contactController.getById
);
router.post('/', contactController.create); // Public endpoint for contact form submissions
router.put(
  '/:id',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  contactController.update
);
router.delete(
  '/:id',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  contactController.delete
);

export { router as contactRoutes };
