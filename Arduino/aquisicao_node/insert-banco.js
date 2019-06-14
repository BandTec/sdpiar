// executar os comandos (pelo git bash ou powershell):
// npm i
// npm start

// qual o nome da pasta onde está o node do site?
var pasta_projeto_site = '../site/Boots';

// leitura dos dados do Arduino
var porta_serial = require('serialport');
var leitura_recebida = porta_serial.parsers.Readline;
var banco = require(`../${pasta_projeto_site}/app-banco`);

// prevenir problemas com muitos recebimentos de dados do Arduino
require('events').EventEmitter.defaultMaxListeners = 15;

// READLINE - Receber entrada do console
var readline = require('readline');
var fk_user
var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

leitor.question("Os dados que serão enviados pertencem a qual usuário?\n", function(answer) {
    fk_user = answer;
    console.log("\nO ID de usuário '" + fk_user + "' foi gravado com sucesso");
    leitor.close();
});
// READLINE - Receber entrada do console

var idsensorbanco = 1 ;


function iniciar_escuta() {

    porta_serial.list().then(entradas_seriais => {

        // este bloco trata a verificação de Arduino conectado (inicio)

        var entradas_seriais_arduino = entradas_seriais.filter(entrada_serial => {
            return entrada_serial.vendorId == 2341 && entrada_serial.productId == 43;
        });

        if (entradas_seriais_arduino.length != 1) {
            throw new Error("Nenhum Arduino está conectado ou porta USB sem comunicação ou mais de um Arduino conectado");
        }

        console.log("Arduino conectado na COM %s", entradas_seriais_arduino[0].comName);

        return entradas_seriais_arduino[0].comName;


        // este bloco trata a verificação de Arduino conectado (fim)

    }).then(arduinoCom => {

        // este bloco trata o recebimento dos dados do Arduino (inicio)

        // o baudRate deve ser igual ao valor em
        // Serial.begin(xxx) do Arduino (ex: 9600 ou 115200)
        var arduino = new porta_serial(arduinoCom, {
            baudRate: 9600
        });

        var parser = new leitura_recebida();
        arduino.pipe(parser);

        console.error('Iniciando escuta do Arduino');

        // Tudo dentro desse parser.on(...
        // é invocado toda vez que chegarem dados novos do Arduino
        parser.on('data', (dados) => {
            console.error(`Recebeu novos dados do Arduino: ${dados}`);
            try {
                // O Arduino deve enviar a temperatura e umidade de uma vez,
                // separadas por ":" (temperatura : umidade)
                var leitura = dados.split(' ');
                registrar_leitura(Number(leitura[0]), Number(leitura[1]));
            } catch (e) {
                throw new Error(`Erro ao tratar os dados recebidos do Arduino: ${e}`);
            }

            // este bloco trata o recebimento dos dados do Arduino (fim)
        });

    }).catch(error => console.error(`Erro ao receber dados do Arduino ${error}`));
}

// função que recebe valores de temperatura e umidade
// e faz um insert no banco de dados
function registrar_leitura(temperatura, umidade) {

    if (efetuando_insert) {
        console.log('Execução em curso. Aguardando 7s...');
        setTimeout(() => {
            registrar_leitura(temperatura, umidade);
        }, 7000);
        return;
    }

    efetuando_insert = true;

    /* if ( temperatura > 25.6 ) { 
        temperatura = parseFloat((temperatura * 5.7).toFixed(1)) ;
    }

    if ( umidade > 80 ) {
        umidade = parseFloat((umidade * 1.11).toFixed(1)) ;
    } */

    console.log(`temperatura: ${temperatura}`);
    console.log(`umidade: ${umidade}`);


    // Controlando a quantidade de sensores por usuário que serão inseridos na tabela
    if (idsensorbanco > 4) {
        idsensorbanco = 1 ;
    }

    banco.conectar().then(() => {

        
        return banco.sql.query(`INSERT into sensor 
        (idsensor,fk_usuario,temperatura,umidade,dataHora) values
         (${idsensorbanco++},${Number(fk_user)}, ${temperatura}, ${umidade},CURRENT_TIMESTAMP);
         
         `);

    }).catch(err => {

        var erro = `Erro ao tentar registrar aquisição na base: ${err}`;
        console.error(erro);

    }).finally( () => {
        banco.sql.close();
        efetuando_insert = false;
    });

}

var efetuando_insert = false;

// iniciando a "escuta" de dispositivos Arduino

teste();

function teste() {
    if (fk_user == null || fk_user == "") {
        console.log("Digite o id do usuário");
        setTimeout(teste, 5000);
    } else {
        iniciar_escuta();
        setInterval(function() {
            registrar_leitura((Math.random()*50).toFixed(1),(Math.random()*90).toFixed(1)) 
        }, 5000)
    }
}

// dados aleatórios: 3 linhas abaixo:
// setInterval(function() {
//     registrar_leitura((Math.random()*50).toFixed(1),(Math.random()*90).toFixed(1)) 
// }, 5000)