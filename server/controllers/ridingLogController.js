import RidingLog from '../models/ridingLog.js';

export const getAllRidingLogs = async (req, res) => {
    try {
        const logs = await RidingLog.findAll({ include: 'author', order: [['date', 'DESC']] });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createRidingLog = async (req, res) => {
    try {
        const log = await RidingLog.create({ ...req.body, authorId: req.user.id });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteRidingLog = async (req, res) => {
    try {
        const { id } = req.params;
        await RidingLog.destroy({ where: { id } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRidingLog = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await RidingLog.update(req.body, { where: { id } });
        if (updated) {
            const updatedLog = await RidingLog.findOne({ where: { id } });
            res.status(200).json(updatedLog);
        } else {
            res.status(404).json({ error: 'Riding log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
