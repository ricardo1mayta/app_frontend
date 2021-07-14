import { Component, OnInit } from '@angular/core';

import { ReportesService } from './../../../../core/service/reportes/reportes.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-chartmensualusuario',
  templateUrl: './chartmensualusuario.component.html',
  styleUrls: ['./chartmensualusuario.component.css'],
})
export class ChartmensualusuarioComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  chart = [];

  chartOptions = {
    responsive: true,
  };
  chartLabels = [];
  chartLegend = true;
  chartPlugins = [];

  chartData = [];
  data = [];

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.datos();
  }
  datos() {
    this.reportesService.getPedidosUsarioSede().subscribe((resul) => {
      let dat = JSON.parse(JSON.stringify(resul));
      let dd = [];
      let ll = [];

      for (let i = 0; i < dat.length; i++) {
        dd[i] = dat[i].total;
        ll[i] = dat[i].firtsName;
      }
      this.chartData.push({
        data: dd,
        label: 'Meses',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        borderSkipped: 5,
      });
      this.chartLabels.push(...ll);
      console.log(this.chartLabels);

      this.chart.push(
        new Chart('canvas2', {
          type: 'bar',
          data: {
            labels: this.chartLabels,
            datasets: this.chartData,
          },
          options: {
            scales: {
              xAxes: [
                {
                  stacked: true,
                },
              ],
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
            responsive: true,
          },
        })
      );
    });
  }
}
