var express = require('express'); //Recupera o modulo Serial express

var app = express();

var path = require('path'); //Recupera o modulo path, que vem junto do express

var server = app.listen(4000, () => { //Inicia o servidor na porta 4000
    console.log("Recebendo solicitações na porta 4000...");
})

var io = require('socket.io')(server); //Recupera o modulo so socket.io e atrela o socket.io ao nosso servidor express.


app.use(express.static('public')); //Send index.html page on GET /



app.get('/', (req, res) => { //Simplesmente devolve a index.html quando for digitado no navegador localhost:4000
    res.sendFile('index.html', {
        root: path.join(__dirname, '..')
    })
})

const SerialPort = require('serialport'); //Recupera o modulo Serial Port

const Readline = SerialPort.parsers.Readline; // Atribui o metodo readline do serial port a variável ReadLine
const port = new SerialPort('COM5'); //Conecta a porta serial COM5. Veja a sua na IDE do Arduino -> Tools -> Port

const parser = port.pipe(new Readline({delimiter: '\n'})); //Lê a linha apenas se uma nova linhas for inserida

parser.on('data', (temp) => { //Na recepção dos dados = "On data retrieving"

    console.log(temp);//Printa o dado recebido no console
    const dadosVetor= dados.replace('/r',',').split(',');
    const temperatura = dadosVetor[0];
    const umidade= dadosVetor[1];

    var datahora = new Date();//Pega a data do sistema 

    var data = datahora.getDate()+"/"+(Number(datahora.getMonth())+1)+"/"+datahora.getFullYear(); //Transforma em uma data legível 1/4/2019

    var hora = (datahora.getHours())+":"+(datahora.getMinutes()); //Transforma em uma hora legível 15:00

    io.sockets.emit('temp', {date: data, time: hora, temp:temperatura, umid:umidade}); //Emite o objeto temp, com os atributos date, time e temp
});

io.on('connection', (socket) => {//É mostrado quando alguem se conecta
    console.log("Alguem acessou a página do gráfico >-<"); 
})