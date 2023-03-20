module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('user_tasks',
      [{
        user_id: 1,
        task: 'Fazer trabalho de casa',
        status: 'A fazer',
      },
      {
        user_id: 1,
        task: 'Fazer compras do mes',
        status: 'Em progresso',
      },
      {
        user_id: 1,
        task: 'Reuniao com a equipe',
        status: 'Finalizada',
      },
      {
        user_id: 2,
        task: 'Comprar ingredientes para o almoco',
        status: 'A fazer',
      },
      {
        user_id: 2,
        task: 'Pagar contas com vencimento atrasado',
        status: 'Em progresso',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('user_tasks', null, {});
  },
};
