'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks',{
      id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
      },
      title:{
        type:Sequelize.STRING,
        allowNull:false
      },
      description:{
        type:Sequelize.TEXT,
        allowNull:true
      },
      priority:{
        type:Sequelize.STRING,
        allowNull:false
      },
      dueDate:{
        type:Sequelize.DATE,
        allowNull:false
      },
      status:{
        type:Sequelize.STRING,
        allowNull:false
      },
      userId:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      createdAt:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false
      }
    });
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('tasks');
  }
};
