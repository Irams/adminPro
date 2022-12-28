import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html'
})


export class Grafica1Component {
  public labels1: string[] = [ '2019', '2021', '2022' ];
  public data1:ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [ {  data: [ 650, 700, 1050],
                   backgroundColor: ['#5459FF','#588EE8','#6DD6FF'],
                  //  hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
                  //  hoverBorderColor:['#000000','#000000','#00000003']
                },
              ]
  };

  public labels2: string[] = [ 'Enero', 'Febrero', 'Marzo' ];
  public data2:ChartData<'doughnut'> = {
    labels: this.labels2,
    datasets: [ {  data: [ 40, 10, 44],
                   backgroundColor: ['#E8584A','#E8584A','#FF4589'],
                  //  hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
                  //  hoverBorderColor:['#000000','#000000','#00000003']
                },
              ]
  }

  public labels3: string[] = [ 'Abril', 'Agosto', 'Diciembre' ];
  public data3:ChartData<'doughnut'> = {
    labels: this.labels3,
    datasets: [ {  data: [ 2000, 1500, 6000],
                   backgroundColor: ['#8252EB','#3F45D4','#5F9BFB'],
                  //  hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
                  //  hoverBorderColor:['#000000','#000000','#00000003']
                },
              ]
  }
}
