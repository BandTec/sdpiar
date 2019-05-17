var desenvolvimento = false;

var configuracoes = {
    producao: {
        //server: "p-i-2019-1.database.windows.net",
        server: "sdpiar.database.windows.net",                 // Banco de Dados Azure Wiilian
        //user: "bandtec",
        user: "adminsdpiar",                                   // Banco de Dados Azure Wiilian
        //password: "#Gf43126627897",
        password: "#Gf46081157822",                            // Banco de Dados Azure Wiilian
        //database: "BancoPI",
        database: "SDPIAR",                                    // Banco de Dados Azure Wiilian
        options: {
            encrypt: true
        },
        pool: {
            max: 4,
            min: 1,
            idleTimeoutMillis: 30000,
            connectionTimeout: 5000
        }
    },
    desenvolvimento: {
        server: "BASETESTE.database.windows.net",
        user: "usuariotestes",
        password: "senhatestes",
        database: "BASETESTE",
        options: {
            encrypt: true
        }
    }
}
 
var sql = require('mssql');
sql.on('error', err => {
    console.error(`Erro de Conexão: ${err}`);
});

var perfil = desenvolvimento ? 'desenvolvimento' : 'producao';

function conectar() {
  return sql.connect(configuracoes[perfil])
  // return new sql.ConnectionPool();  
} 

module.exports = {
    conectar: conectar,
    sql: sql
}