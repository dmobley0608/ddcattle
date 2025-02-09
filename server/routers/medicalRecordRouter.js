import express from 'express';
import MedicalRecord from '../models/medicalRecord.js';
import { createMedicalRecord, updateMedicalRecord, deleteMedicalRecord } from '../controllers/medicalRecordController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes for medical records
router.get('/', async (req, res) => {
    const records = await MedicalRecord.findAll();
    res.json(records);
});

router.post('/', authenticateToken, authorizeRole(['TRAINER', 'ADMIN']), createMedicalRecord);
router.put('/:id', authenticateToken, authorizeRole(['TRAINER', 'ADMIN']), updateMedicalRecord);
router.delete('/:id', authenticateToken, authorizeRole(['TRAINER', 'ADMIN']), deleteMedicalRecord);

export default router;
