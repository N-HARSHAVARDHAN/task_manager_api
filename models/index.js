import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import createUser from "./user.js";
import createTask from "./task.js";
const User = createUser(sequelize, DataTypes);
const Task = createTask(sequelize, DataTypes);

const models = {
    User,
    Task
};

User.associate(models);
Task.associate(models);

export {
    sequelize,
    User,
    Task
};