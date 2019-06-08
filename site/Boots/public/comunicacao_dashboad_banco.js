var usuario;
var exibiu_grafico = false;

verificarAutenticacao();


function verificarAutenticacao() {
    usuario = sessionStorage.nome_usuario_bandtec;

    if (usuario == undefined) {
        window.location.href = 'login.html';
    } else if (usuario == "Wilma") {
        window.location.href = 'admin.html';
    }
}

function logoff() {
    sessionStorage.clear();
    verificarAutenticacao();
}

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGrafico() {
    obterDadosGrafico2();
    setTimeout(atualizarGrafico, 50000);
}

// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
function configurarGrafico() {
    var configuracoes = {
        responsive: true,
        animation: exibiu_grafico ? false : { duration: 1500 },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Histórico recente de temperatura e umidade'
        },
        scales: {
            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-temperatura',
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                id: 'y-umidade',

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    };

    exibiu_grafico = true;

    return configuracoes;
}

// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd

function obterDadosGrafico2() {

    // neste JSON tem que ser 'labels', 'datasets' etc, 
    // porque é o padrão do Chart.js
    var dados = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-temperatura',
                label: 'Temperatura',
                borderColor: window.chartColors.red,
                backgroundColor: window.chartColors.red,
                fill: false,
                data: []
            },
            {
                yAxisID: 'y-umidade',
                label: 'Umidade',
                borderColor: window.chartColors.blue,
                backgroundColor: window.chartColors.blue,
                fill: false,
                data: []
            }
        ]
    };

    fetch(`/leituras/area/${sessionStorage.area_atual}/${sessionStorage.s1_atual}/${sessionStorage.s2_atual}/${sessionStorage.s3_atual}/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                resposta.reverse();

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    // aqui, após 'registro.' use os nomes 
                    // dos atributos que vem no JSON 
                    // que gerou na consulta ao banco de dados

                    dados.labels.push(registro.hora);

                    dados.datasets[0].data.push(registro.mt);
                    dados.datasets[1].data.push(registro.mu);
                    last_temp.innerHTML = parseInt(registro.mt) + 'º';
                    last_umid.innerHTML = parseInt(registro.mu) + '%';
                }
                console.log(JSON.stringify(dados));

                div_aguarde.style.display = 'none';

                plotarGrafico(dados);
                mediaT();
                medianaU();
                medianaT();
                quartil1U();
                quartil1T();
                quartil3U();
                quartil3T();
                mediaU();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// só altere aqui se souber o que está fazendo!
function plotarGrafico(dados) {
    botao_mudar_area.disabled = false ;
    console.log('iniciando plotagem do gráfico...');

    var ctx = myAreaChart.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        options: configurarGrafico()
    });
}



// Testes de busca de acordo com usuário logado

function buscar_areas() {
    botao_mudar_area.disabled = true ;
    fetch(`/leituras/teste/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                // sessionStorage.idarea = resposta[0].idarea;
                // sessionStorage.s1 = resposta[0].primeirosensor;
                // sessionStorage.s2 = resposta[0].segundosensor;
                // sessionStorage.s3 = resposta[0].terceirosensor;

                for ( contador = 0 ; contador < resposta.length ; contador++ ) {
                    sessionStorage.setItem(`idarea${contador}`, resposta[contador].idarea);
                    sessionStorage.setItem(`s1${contador}`, resposta[contador].primeirosensor);
                    sessionStorage.setItem(`s2${contador}`, resposta[contador].segundosensor);
                    sessionStorage.setItem(`s3${contador}`, resposta[contador].terceirosensor);
                }

                sessionStorage.area_atual = resposta[0].idarea ;
                sessionStorage.s1_atual = resposta[0].primeirosensor ;
                sessionStorage.s2_atual = resposta[0].segundosensor ;
                sessionStorage.s3_atual = resposta[0].terceirosensor ;

                // calcular_areas();
                setTimeout(atualizarGrafico,10000) ;                


                
                


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });
}

function trocar_area() {
    if (numero_area.value > areas || numero_area.value < 1) {
        alert (`Você não tem essa área cadastrada`) ;
    } else if (numero_area.value == 1) {
        sessionStorage.area_atual = sessionStorage.idarea0 ;
        sessionStorage.s1_atual = sessionStorage.s10 ;
        sessionStorage.s2_atual = sessionStorage.s20 ;
        sessionStorage.s3_atual = sessionStorage.s30 ;
        } else if (numero_area.value == 2) {
            sessionStorage.area_atual = sessionStorage.idarea1 ;
            sessionStorage.s1_atual = sessionStorage.s11 ;
            sessionStorage.s2_atual = sessionStorage.s21 ;
            sessionStorage.s3_atual = sessionStorage.s31 ;
            } else if (numero_area.value == 3) {
                sessionStorage.area_atual = sessionStorage.idarea2 ;
                sessionStorage.s1_atual = sessionStorage.s12 ;
                sessionStorage.s2_atual = sessionStorage.s22 ;
                sessionStorage.s3_atual = sessionStorage.s32 ;
                }
}

// Aquisição Node
var c = 0 ;
var areas = ( sessionStorage.length - 6 ) / 4 ;
function calcular_areas () {

    if (c < areas) {
        fetch(`/leituras/calc_areas/${sessionStorage.idarea0}/${sessionStorage.id_usuario_bandtec}/${sessionStorage.s10}/${sessionStorage.s20}/${sessionStorage.s30}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro : ${error.message}`);
            });
        c++ ;    
    } else {
        c = 0 ;
    }

    setTimeout(calcular_areas, 5000);
}



// FUNÇÃO DOS QUARTIS

function mediaT() {
    // MEDIA DA TEMPERATURA

    fetch(`/leituras/mediaT/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                avg_temp.innerHTML = parseInt(resposta[0].batata) + 'º';
                mediaU();


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });
}

function mediaU() {
    // MEDIA DA UMIDADE

    fetch(`/leituras/mediaU/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                avg_umid.innerHTML = parseInt(resposta[0].batata) + '%';
                quartil3T();


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });

}



function quartil3T() {

    fetch(`/leituras/quartil3T/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                temp_quartil_tres.innerHTML = parseInt(resposta[0].batata) + 'º';
                quartil3U();



            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });


}
function quartil3U() {
    // 3 QUARTIL DA UMIDADE

    fetch(`/leituras/quartil3U/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                umid_quartil_tres.innerHTML = parseInt(resposta[0].batata) + '%';
                quartil1T();

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });
}



function quartil1T() {
    // PRIMEIRO QUARTIL DA TEMPERATURA
    fetch(`/leituras/quartil1T/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                temp_quartil_um.innerHTML = parseInt(resposta[0].batata) + 'º';
                quartil1U();


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });


}

function quartil1U() {
    // PRIMEIRO QUARTIL DA UMIDADE

    fetch(`/leituras/quartil1U/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                umid_quartil_um.innerHTML = parseInt(resposta[0].batata) + '%';
                medianaT();
                
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });
}

function medianaT() {
    // PRIMEIRO QUARTIL DA UMIDADE

    fetch(`/leituras/medianaT/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                temp_mediana.innerHTML = parseInt(resposta[0].mediana) + 'º';
                medianaU();


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });
}

function medianaU() {
    // PRIMEIRO QUARTIL DA UMIDADE

    fetch(`/leituras/medianaU/${sessionStorage.id_usuario_bandtec}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                umid_mediana.innerHTML = parseInt(resposta[0].mediana) + '%';



            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro : ${error.message}`);
        });
}