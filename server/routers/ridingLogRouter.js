import express from 'express';
import RidingLog from '../models/ridingLog.js';
import { createRidingLog, getAllRidingLogs, deleteRidingLog, updateRidingLog } from '../controllers/ridingLogController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes for riding logs
router.get('/', getAllRidingLogs);
router.post('/', authenticateToken, authorizeRole(['ADMIN', 'TRAINER']), createRidingLog);
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN', 'TRAINER']), deleteRidingLog);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN', 'TRAINER']), updateRidingLog);

export default router;
