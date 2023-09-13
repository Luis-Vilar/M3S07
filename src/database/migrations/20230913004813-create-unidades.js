'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('geracoes', 'unidade_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'unidades', // Nome da tabela de referência
        key: 'id', // Nome da coluna de referência na tabela 'unidades'
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('geracoes', 'unidade_id');
    
  }
};
