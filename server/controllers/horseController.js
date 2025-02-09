import sequelize from '../config/database.js';
import Horse from '../models/horse.js';
import MedicalRecord from '../models/medicalRecord.js';
import RidingLog from '../models/ridingLog.js';
import Media from '../models/media.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            const horse = await Horse.findByPk(req.params.id);
            if (!horse) {
                return cb(new Error('Horse not found'));
            }
            const uploadPath = path.join(__dirname, '..', 'uploads', horse.name);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        try {
            cb(null, `${Date.now()}-${file.originalname}`);
        } catch (error) {
            cb(error);
        }
    }
});

const upload = multer({ storage });

export const getAllHorses = async (req, res) => {
    try {
        const horses = await Horse.findAll({
            order: [
                ['name', 'ASC']
            ]
        });
        res.json(horses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorseById = async (req, res) => {
    try {
        const horse = await Horse.findByPk(req.params.id, {
            include: [
                {
                    model: MedicalRecord,
                    as: 'medicalRecords',
                    separate: true, // Ensure all medical records are included
                    order: [['date', 'DESC']]
                },
                {
                    model: RidingLog,
                    as: 'ridingLogs'
                },
                {
                    model: Media,
                    as: 'media'
                }
            ]
        });
        if (horse) {
            res.json(horse);
        } else {
            res.status(404).json({ error: 'Horse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorseByName = async (req, res) => {
    try {
        const horse = await Horse.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: MedicalRecord,
                    as: 'medicalRecords',
                    separate: true, // Ensure all medical records are included
                    order: [['date', 'DESC']]
                },
                {
                    model: RidingLog,
                    as: 'ridingLogs'
                },
                {
                    model: Media,
                    as: 'media'
                }
            ]
        });
        if (horse) {
            res.json(horse);
        } else {
            res.status(404).json({ error: 'Horse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHorse = async (req, res) => {
    try {
        const horse = await Horse.findByPk(req.params.id);
        if (horse) {
            const updatedData = { ...req.body };
            if (updatedData.deceased === '') {
                updatedData.deceased = null;
            }
            await horse.update(updatedData);
            res.json(horse);
        } else {
            res.status(404).json({ error: 'Horse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createHorse = async (req, res) => {
    try {
        const horse = await Horse.create(req.body);
        res.status(201).json(horse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const uploadMedia = async (req, res) => {
    try {
        const horse = await Horse.findByPk(req.params.id);
        if (!horse) {
            return res.status(404).json({ error: 'Horse not found' });
        }

        const files = req.files;
        const mediaEntries = files.map(file => ({
            horseId: horse.id,
            url: `/uploads/${horse.name}/${file.filename}`,
            type: file.mimetype.startsWith('image/') ? 'image' : 'video'
        }));

        await Media.bulkCreate(mediaEntries);
        res.status(201).json({ message: 'Media uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedia = async (req, res) => {
    try {
        const media = await Media.findByPk(req.params.mediaId);
        if (!media) {
            return res.status(404).json({ error: 'Media not found' });
        }

        const filePath = path.join(__dirname, '..', media.url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await media.destroy();
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const uploadMediaMiddleware = upload.array('media');
