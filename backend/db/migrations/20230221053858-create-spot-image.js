'use strict';
/** @type {import('sequelize-cli').Migration} */

//options object
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "SpotImages",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          unique: true,
        },
        spotId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: "Spots", key: "id" },
        },
        imgUrl: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        isPreview: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SpotImages');
  }
};