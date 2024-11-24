const graficoBarraDia = document.getElementById('graficoBarraDia');
const graficoBarraSemana = document.getElementById('graficoBarraSemana');
const graficoBarraMes = document.getElementById('graficoBarraMes');
const graficoSeguidorDia = document.getElementById('graficoSeguidorDia');
const graficoSeguidorSemana = document.getElementById('graficoSeguidorSemana');
const graficoSeguidorMes = document.getElementById('graficoSeguidorMes');
    graficoBarraDia.style.display = 'block'
    graficoBarraSemana.style.display = 'none'
    graficoBarraMes.style.display = 'none'
    graficoSeguidorDia.style.display = 'block'
    graficoSeguidorSemana.style.display = 'none'
    graficoSeguidorMes.style.display = 'none'

    // new Chart(graficoSeguidorDia, {
    //     type: 'line',
    //     data: {
    //       labels: ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    //       datasets: [{
    //         label: 'Seguidor',
    //         data: [30, 29, 28, 25, 22, 23],
    //         borderWidth: 1,
    //         borderColor: '#FF6A00',
    //         backgroundColor:'#FF6A00'
      
    //       },
        
    //     ]
      
    //     },
        
    //     options: {
    //       scales: {
    //         y: {
    //           beginAtZero: true
    //         }
    //       }
    //     }
    //   });
    // new Chart(graficoSeguidorSemana, {
    //     type: 'line',
    //     data: {
    //       labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    //       datasets: [{
    //         label: 'Seguidor',
    //         data: [30, 29, 28, 25, 22, 23],
    //         borderWidth: 1,
    //         borderColor: '#FF6A00',
    //         backgroundColor:'#FF6A00'
      
    //       },
        
    //     ]
      
    //     },
        
    //     options: {
    //       scales: {
    //         y: {
    //           beginAtZero: true
    //         }
    //       }
    //     }
    //   });

new Chart(graficoBarraDia, {
    type: 'bar',
    data: {
        // labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00'],
      datasets: [{
        label: 'Curtida',
        // data: [22, 24, 27, 23, 20, 19],
        borderWidth: 1,
        borderColor: '#FF6A00',
        backgroundColor:'#FF6A00'
      },
      {
        label: 'Publicação',
        data: [90, 89, 93, 87, 88, 82],
        borderWidth: 1,
        borderColor: '#003366',
        backgroundColor:'#003366'
      }
    ]
    },
    options: {
      scales: {
        y: {
            beginAtZero: true
        }
    }
}
});

new Chart(graficoBarraSemana, {
    type: 'bar',
    data: {
        labels: ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        datasets: [{
            label: 'Curtida',
            data: [22, 24, 27, 23, 20, 19],
            borderWidth: 1,
            borderColor: '#003366',
            backgroundColor:'#003366'
        },
        {
            label: 'Publicação',
            data: [90, 89, 93, 87, 88, 82],
            borderWidth: 1,
            borderColor: '#36A2EB',
            backgroundColor:'#36A2EB'
        }
    ]
},
options: {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
});

new Chart(graficoBarraMes, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
            label: 'Curtida',
            data: [22, 24, 27, 23, 20, 19],
            borderWidth: 1,
            borderColor: '#003366',
            backgroundColor:'#003366'
        },
        {
            label: 'Publicação',
            data: [90, 89, 93, 87, 88, 82],
            borderWidth: 1,
            borderColor: '#36A2EB',
            backgroundColor:'#36A2EB'
        }
    ]
},
options: {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
});

// new Chart(graficoSeguidorMes, {
//     type: 'line',
//     data: {
//         labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
//         datasets: [{
//             label: 'Seguidor',
//             data: [22, 24, 27, 23, 20, 19],
//             borderWidth: 1,
//             borderColor: '#FF6A00',
//             backgroundColor:'#FF6A00'
//         }
       
//     ]
// },
// options: {
//     scales: {
//         y: {
//             beginAtZero: true
//         }
//     }
// }
// });


function gerarGrafico(tipo){
    
    graficoBarraDia.style.display = 'none'
    graficoBarraSemana.style.display = 'none'
    graficoBarraMes.style.display = 'none'
    graficoSeguidorDia.style.display = 'none'
    graficoSeguidorSemana.style.display = 'none'
    graficoSeguidorMes.style.display = 'none'
    if(tipo == 'semana'){
            graficoBarraSemana.style.display = 'block'
            graficoBarraDia.style.display = 'none'
            graficoBarraMes.style.display = 'none'
            graficoSeguidorSemana.style.display = 'block'
            graficoSeguidorDia.style.display = 'none'
            graficoSeguidorMes.style.display = 'none'
            
    }else if (tipo == 'mes'){
            graficoBarraSemana.style.display = 'none'
            graficoBarraDia.style.display = 'none'
            graficoBarraMes.style.display = 'block'
            graficoSeguidorSemana.style.display = 'none'
            graficoSeguidorDia.style.display = 'none'
            graficoSeguidorMes.style.display = 'block'
        
}else {

            graficoBarraSemana.style.display = 'none'
            graficoBarraDia.style.display = 'block'
            graficoBarraMes.style.display = 'none'
            graficoSeguidorSemana.style.display = 'none'
            graficoSeguidorDia.style.display = 'block'
            graficoSeguidorMes.style.display = 'none'
    
}
}