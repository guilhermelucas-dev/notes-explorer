// importando  módulos
const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');

async function migrationsRun() {
  // variável que é uma string resultante da concatenação do conteudo do array
  const schemas = [
    createUsers
  ].join('');

  // chama a função de conexão
  // então, quqando a conexão for bem sucedida executa a variável schemas.
  // O método catch() lida com os erros, caso ajá erro na conexão.
  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error));
}

module.exports = migrationsRun;