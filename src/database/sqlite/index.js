// Importando módulos
//importa o módulo sqlite3, que fornece as ligações assíncrona do SQLite3 para o node
const sqlite3 = require('sqlite3');
// importa o módulo sqlite, que é usado para abrir e gernciar conexões com o bando de dados
const sqlite = require('sqlite');
const path = require("path")

// funão assincrona que retorna um objeto de conexão com o banco de dados Sqlite
async function sqliteConnection() {
  // aguarde o método sqlite.open() criar uma conexção com o banco de dados
  // o método recebe um objeto com duas propiedades
  // filename: o caminho para o arquivo do bando
  // driver: o driver do banco de daods.
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database 
  });

  return database;
  
}

module.exports = sqliteConnection;