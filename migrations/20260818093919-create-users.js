'use strict';

export default  {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {

      id: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey: true
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });

  },

  async down(queryInterface) {

    await queryInterface.dropTable('users');

  }
};