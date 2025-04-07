import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import MedicalRecord from './medicalRecord.js';
import RidingLog from './ridingLog.js';
import Media from './media.js';

const Horse = sequelize.define('Horse', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: true
    },
    foal_year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    HMA: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    deceased: {
        type: DataTypes.DATE,
        allowNull: true
    },
    off_property_rides: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    on_property: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    age: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.deceased) {
                return new Date(this.deceased).getFullYear() - this.foal_year;
            }
            if (this.foal_year) {
                return new Date().getFullYear() - this.foal_year;
            }
            return null;
        }
    },
    weight: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.getDataValue('weight');
        }
    },
    height: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.getDataValue('height');
        }
    },
    needsTrimmed: {
        type: DataTypes.VIRTUAL,
        get() {
            if (!this.on_property || this.deceased!= null) {
                return false;
            }
            return this.getDataValue('needsTrimmed');
        }
    },
    needsWormed: {
        type: DataTypes.VIRTUAL,
        get() {
            if (!this.on_property || this.deceased!= null) {
                return false;
            }
            return this.getDataValue('needsWormed');
        }
    },
    needsCoggins: {
        type: DataTypes.VIRTUAL,
        get() {
            if (!this.on_property || this.deceased || !this.off_property_rides) {
                return false;
            }
            return this.getDataValue('needsCoggins');
        }
    },
    needsYearly: {
        type: DataTypes.VIRTUAL,
        get() {
            if (!this.on_property || this.deceased != null) {
                return false;
            }
            return this.getDataValue('needsYearly');
        }
    },
    profileImage: {
        type: DataTypes.VIRTUAL,
         get() {
            return this.getDataValue('profileImage');
        }
    }
}, {
    tableName: 'horses', // Ensure this matches the table name in the database
    hooks: {
        async afterFind(horses) {
            if (!Array.isArray(horses)) {
                horses = [horses];
            }


            for (const horse of horses) {
                //Select Horse Profile Image
                const mediaRecords = await Media.findAll({
                    where: {
                        horseId: horse.id,
                        type: 'image'
                    }
                });
                const randomImage = Math.floor(Math.random() * mediaRecords.length);
                horse.setDataValue('profileImage', mediaRecords ? mediaRecords[randomImage]?.url : mediaRecords[0]?.url);
                // Get the most recent weight record for the horse
                const medicalRecord = await MedicalRecord.findOne({
                    where: {
                        horseId: horse.id,
                        weight: {
                            [Sequelize.Op.ne]: null,
                            [Sequelize.Op.ne]: 0
                        }
                    },
                    order: [['date', 'DESC']]
                });
                horse.setDataValue('weight', medicalRecord ? medicalRecord.weight : null);
                //Get the most recent height record for the horse
                const heightRecord = await MedicalRecord.findOne({
                    where: {
                        horseId: horse.id,
                        height: {
                            [Sequelize.Op.ne]: null,
                            [Sequelize.Op.ne]: 0
                        }
                    },
                    order: [['date', 'DESC']]
                });
                horse.setDataValue('height', heightRecord ? heightRecord.height : null);
                if (!horse.deceased && horse.on_property) {
                    // Determine if the horse needs to be trimmed
                    const needsTrimmed = await MedicalRecord.findOne({
                        where: {
                            horseId: horse.id,
                            trimmed: true
                        },
                        order: [['date', 'DESC']]
                    });
                    if (needsTrimmed) {
                        const daysSinceTrimmed = (new Date() - new Date(needsTrimmed.date)) / (1000 * 60 * 60 * 24);
                        horse.setDataValue('needsTrimmed', 42-daysSinceTrimmed);
                    } else {
                        horse.setDataValue('needsTrimmed', false);
                    }
                    // Determine if the horse needs to be wormed
                    const needsWormed = await MedicalRecord.findOne({
                        where: {
                            horseId: horse.id,
                            wormed: true
                        },
                        order: [['date', 'DESC']]
                    });
                    if (needsWormed) {
                        const daysSinceWormed = (new Date() - new Date(needsWormed.date)) / (1000 * 60 * 60 * 24);
                        horse.setDataValue('needsWormed', 120 - daysSinceWormed);
                    } else {
                        horse.setDataValue('needsWormed', false);
                    }
                    // Determine if the horse needs a coggins test
                    const needsCoggins = await MedicalRecord.findOne({
                        where: {
                            horseId: horse.id,
                            coggins: true
                        },
                        order: [['date', 'DESC']]
                    });
                    if (needsCoggins && horse.off_property_rides) {
                        const daysSinceCoggins = (new Date() - new Date(needsCoggins.date)) / (1000 * 60 * 60 * 24);
                        horse.setDataValue('needsCoggins', 365-daysSinceCoggins);
                    } else {
                        horse.setDataValue('needsCoggins', false);
                    }
                    // Determine if the horse needs yearly vaccinations
                    const needsYearly = await MedicalRecord.findOne({
                        where: {
                            horseId: horse.id,
                            yearly_vaccines: true
                        },
                        order: [['date', 'DESC']]
                    });
                    if (needsYearly) {
                        const daysSinceYearly = (new Date() - new Date(needsYearly.date)) / (1000 * 60 * 60 * 24);
                        horse.setDataValue('needsYearly', 365-daysSinceYearly);
                    } else {
                        horse.setDataValue('needsYearly', false);
                    }
                } else {
                    horse.setDataValue('needsTrimmed', false);
                    horse.setDataValue('needsWormed', false);
                    horse.setDataValue('needsCoggins', false);
                    horse.setDataValue('needsYearly', false);
                }
            }
        }
    }
});

// Define associations
Horse.hasMany(MedicalRecord, { as: 'medicalRecords', foreignKey: 'horseId' });
Horse.hasMany(RidingLog, { as: 'ridingLogs', foreignKey: 'horseId' });
Horse.hasMany(Media, { as: 'media', foreignKey: 'horseId' });
MedicalRecord.belongsTo(Horse, { foreignKey: 'horseId' });
RidingLog.belongsTo(Horse, { foreignKey: 'horseId' });
Media.belongsTo(Horse, { foreignKey: 'horseId' });

// Sync the model with the database
sequelize.sync();

export default Horse;
