import { Router } from 'express';
import authRoutes from './auth';
import adminRoutes from './admin';
import ticketRoutes from './tickets';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/ticket', ticketRoutes);

export default router;
