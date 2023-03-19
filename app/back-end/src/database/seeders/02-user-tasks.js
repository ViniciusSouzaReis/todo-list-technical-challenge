module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('user_tasks',
      [{
        user_id: 1,
        task: 'Fazer trabalho de casa',
      },
      {
        user_id: 1,
        task: 'Fazer compras do mes',
      },
      {
        user_id: 1,
        task: 'Reuniao com a equipe',
      },
      {
        user_id: 2,
        task: 'Comprar ingredientes para o almoco',
      },
      {
        user_id: 2,
        task: 'Pagar contas com vencimento atrasado',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('user_tasks', null, {});
  },
};
