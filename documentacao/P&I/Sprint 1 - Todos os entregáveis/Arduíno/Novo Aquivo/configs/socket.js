socket.on('temp', function(data) { //Assim q o temp é recebido

    console.log(data.temp);

    // date.innerHTML = data.date; //Define a data

    if(t1.data.labels.length <=  15) { //Se houver menos de 15 dados
        t1.data.labels.push(data.time);  //Coloca o horário no eixo X
        t1.data.datasets.forEach((dataset) => {
            dataset.data.push(data.temp); //Adiciona a temperatura no eixo Y
        });
    }
    else {
        t1.data.labels.shift(); //Remove o primeiro registro de horário
        t1.data.labels.push(data.time); //Insere a data atual
        t1.data.datasets.forEach((dataset) => {
            dataset.data.shift(); //Remove o primeiro registro de tempertura
            dataset.data.push(data.temp); //Insere um novo registro de temperatura
        });
    }
    t1.update(); //Atualiza o gráfico

    if(t2.data.labels.length <=  15) { //Se houver menos de 15 dados
        t2.data.labels.push(data.time);  //Coloca o horário no eixo X
        t2.data.datasets.forEach((dataset) => {
            dataset.data.push(data.umid); //Adiciona a temperatura no eixo Y
        });
    }
    else {
        t2.data.labels.shift(); //Remove o primeiro registro de horário
        t2.data.labels.push(data.time); //Insere a data atual
        t2.data.datasets.forEach((dataset) => {
            dataset.data.shift(); //Remove o primeiro registro de tempertura
            dataset.data.push(data.umid); //Insere um novo registro de temperatura
        });
    }
    t2.update();
});

