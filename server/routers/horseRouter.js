import express from 'express';
import { getAllHorses, createHorse, getHorseById, getHorseByName, updateHorse, uploadMedia, uploadMediaMiddleware, deleteMedia } from '../controllers/horseController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes for horse
router.get('/', getAllHorses);
router.post('/', authenticateToken, authorizeRole(['TRAINER', 'ADMIN']), createHorse);
router.get('/:id', getHorseById);
router.get('/name/:name', getHorseByName);
router.put('/:id', authenticateToken, authorizeRole(['TRAINER', 'ADMIN']), updateHorse);
router.post('/:id/media', authenticateToken, authorizeRole(['TRAINER', 'ADMIN']), uploadMediaMiddleware, uploadMedia);
router.delete('/media/:mediaId', authenticateToken, authorizeRole(['TRAINER', 'ADMIN']), deleteMedia);

export default router;
