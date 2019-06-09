// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Dom", "Seg", "Ter", "Quar", "Quin", "Sex", "Sab"],
    datasets: [{
      label: "Graus",
      lineTension: 0.3,
      backgroundColor: "rgba(240, 52, 52, 0.4)",
      borderColor: "rgba(240, 52, 52, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(240, 52, 52, 1)",
      pointBorderColor: "rgba(240, 52, 52, 1)",
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "rgba(240, 52, 52, 1)",
      pointHoverBorderColor: "rgba(240, 52, 52, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 6,
      data: [],
      yAxisID: 'temp_test',

    },
    {
      label: "Umidade",
      lineTension: 0.3,
      backgroundColor: "rgba(52, 52, 240, 0.4)",
      borderColor: "rgba(52, 52, 240, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(52, 52, 240, 1)",
      pointBorderColor: "rgba(52, 52, 240, 1)",
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "rgba(52, 52, 240, 1)",
      pointHoverBorderColor: "rgba(52, 52, 240, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 6,
      data: [],
      yAxisID: 'umid_test',
    }
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        id:'temp_test',
        position:'right',
        ticks: {
          callback: function(value, index, values) {
          return number_format(value) + '°';
        }
        }
      },
      {
        id:'umid_test',
        ticks: {
          callback: function(value, index, values) {
          return number_format(value) + '%';
        }
        }
      }
      ],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: 'black',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});
