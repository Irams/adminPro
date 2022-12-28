import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() titulo: string = 'Sin titulo';

  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [ 'Data', 'Data 2', 'Data 3' ];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor: [ '#242A33', '#398BF7', '#F02059' ] 
      },
    ],
  };
}

