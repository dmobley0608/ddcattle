import MedicalRecord from '../models/medicalRecord.js';

export const getAllMedicalRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.findAll();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.create(req.body);
        res.status(201).json(medicalRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMedicalRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await MedicalRecord.update(req.body, { where: { id } });
        if (updated) {
            const updatedRecord = await MedicalRecord.findOne({ where: { id } });
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({ error: 'Medical record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedicalRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await MedicalRecord.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Medical record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
