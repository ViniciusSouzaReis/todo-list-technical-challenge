module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        name: 'Fulano Silva',
        email: 'fulano@email.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        // senha: md5('--adm2@21!!--')
      },
      {
        id: 2,
        name: 'Ciclano Souza',
        email: 'ciclano@email.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        // senha: md5('fulana@123')
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};