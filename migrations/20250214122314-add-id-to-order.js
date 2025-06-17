module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("OrderProducts", "id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      // allowNull: false,
      primaryKey: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("OrderProducts", "id");
  },
};
