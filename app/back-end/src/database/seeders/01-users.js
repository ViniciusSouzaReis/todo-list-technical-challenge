module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        name: 'Fulano Silva',
        email: 'fulano@email.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        // senha: md5('123456')
      },
      {
        id: 2,
        name: 'Ciclano Souza',
        email: 'ciclano@email.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        // senha: md5('123456')
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};