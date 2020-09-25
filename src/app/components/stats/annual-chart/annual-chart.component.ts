import { Component, OnDestroy, OnInit } from '@angular/core';

import { ChartData } from 'src/app/models/stats/chartData';
import { AnnualChartService } from 'src/app/services/stats/annual-chart.service';

import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { MovesService } from 'src/app/services/moves/moves.service';

@Component({
  selector: 'app-annual-chart',
  templateUrl: './annual-chart.component.html',
  styleUrls: ['./annual-chart.component.css']
})
export class AnnualChartComponent implements OnInit, OnDestroy {
  annualChart: Chart;
  annualChartData: ChartData;
  monthsChartCtx: CanvasRenderingContext2D;

  subscription: Subscription;

  constructor(private movesService: MovesService, private annualChartService: AnnualChartService) { }

  ngOnInit(): void {
    this.subscription = this.movesService.movesUpdated.subscribe(
      () => { this.generateChart(); }
    );

    this.generateChart();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private generateChart() {
    this.annualChartService.getDataset().subscribe(
      annual => {
        this.annualChartData = annual;
        this.annualChartData.type = 'bar';

        this.annualChartData.options = {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          },
          legend: {
            display: false           
          },
          animation: {
            duration: 1500,
          },
          tooltips: {
            enabled: true,
            position: "average",
            mode: 'index',
            intersect: false
          }
        };

        this.renderChart();
      }
    );
  }

  private renderChart() {
    if (this.annualChart != undefined) { this.annualChart.destroy(); }
    this.monthsChartCtx = (<HTMLCanvasElement> document.getElementById("annual-chart")).getContext('2d');
    this.annualChart = new Chart(this.monthsChartCtx, this.annualChartData);
  }
}
