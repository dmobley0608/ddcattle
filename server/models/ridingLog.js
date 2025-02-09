import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Horse from './horse.js';
const RidingLog = sequelize.define('RidingLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    horseId: {
        type: DataTypes.UUID,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    authorId: {
        type: DataTypes.UUID,
        allowNull: false
    }
});


sequelize.sync();
export default RidingLog;
