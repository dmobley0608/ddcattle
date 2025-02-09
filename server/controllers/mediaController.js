import Media from '../models/media';

export const getAllMedia = async (req, res) => {
    try {
        const media = await Media.findAll();
        res.json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createMedia = async (req, res) => {
    try {
        const media = await Media.create(req.body);
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
