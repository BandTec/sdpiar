var socket = io.connect('http://localhost:4000');
var temper = temp.getContext('2d');
var t1 = new Chart(temper, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: "#af2828",
            borderColor: "#af2828",
            borderWidth: 3,
            pointStyle: 'triangle',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0.2,
            fill: false,
            label: "Temperatura"
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Gráfico de Temperatura',
            fontSize: 30,
            fontColor: "#af2828",
            fontStyle: "normal"
        },
        scales: {
            yAxes: [{
                ticks: {
                    // Inclui a °C para o gráfico de Temperatura
                    callback: function(value) {
                        return value + '°C';
                    }
                }
            }]
        }
}
});
var g2 = coco.getContext('2d');
var t2 = new Chart(g2, {
    type:'line',
    data:{
        labels:[],
        datasets: [{
            data: [],
            backgroundColor: "#af2828",
            borderColor: "#af2828",
            borderWidth: 3,
            pointStyle: 'triangle',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0.2,
            fill: false,
            label: "Umidade"
        }]

    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Gráfico de Umidade',
            fontSize: 30,
            fontColor: "#af2828",
            fontStyle: "normal"
        },
        scales: {
            yAxes: [{
                ticks: {
                    // Inclui a °C para o gráfico de Temperatura
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }]
        }
}
});