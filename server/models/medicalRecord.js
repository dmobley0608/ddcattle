import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MedicalRecord = sequelize.define('MedicalRecord', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,

    },
    horseId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vet: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    wormed: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    coggins: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    yearly_vaccines: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    trimmed: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'MedicalRecords'
});

sequelize.sync();

export default MedicalRecord;
