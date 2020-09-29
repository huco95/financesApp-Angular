import { Component, OnDestroy, OnInit } from '@angular/core';

import { ChartData } from 'src/app/models/charts/chartData';
import { AnnualChartService } from 'src/app/services/stats/annual-chart.service';

import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { MovesService } from 'src/app/services/moves/moves.service';
import { MonthService } from 'src/app/services/month/month.service';
import { Legend } from 'src/app/models/charts/legend';
import { Dataset } from 'src/app/models/charts/dataset';
import { AnnualChart } from 'src/app/models/charts/annualChart';

@Component({
  selector: 'app-annual-chart',
  templateUrl: './annual-chart.component.html',
  styleUrls: ['./annual-chart.component.css']
})
export class AnnualChartComponent implements OnInit, OnDestroy {
  isLoading: boolean;

  annualChart: Chart;
  annualChartData: ChartData;
  monthsChartCtx: CanvasRenderingContext2D;

  subscription: Subscription;

  constructor(
    private movesService: MovesService,
    private annualChartService: AnnualChartService,
    private monthService: MonthService) { }

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
    this.hideChart();

    this.annualChartService.getDataset().subscribe(dataset => {
      if (this.annualChart != undefined) {
        this.updateChart(dataset);

      } else {
        this.createChart(dataset);
        this.generateLegends();
        this.renderChart();
      }

      this.showChart();
    });
  }

  private generateLegends() {
    let legends: Array<Legend> = [];
    this.annualChartData.data.datasets.forEach((dataset) => {
      legends.push({
          label: dataset.label,
          backgroundColor: dataset.backgroundColor as string,
      });
    });

    this.annualChartData.legends = legends;
  }

  private createChart(dataset: AnnualChart) {
    this.annualChartData = 
    {
      type: 'bar',
      options: this.getOptions(),
      legends: [],
      data: {
        datasets: [
          {
            type: 'line',
            label: "Balance",
            data: dataset.balances,
            borderColor: "#5a67d8",
            backgroundColor: "#5a67d8",
            pointBackgroundColor: "#5a67d8",
            pointBorderColor: "#5a67d8",
            borderWidth: 2,
            fill: false
          },
          {
            type: 'bar',
            label: "Income",
            data: dataset.incomes,
            backgroundColor: "#48bb78"
          },
          {
            type: 'bar',
            label: "Expense",
            data: dataset.expenses,
            backgroundColor: "#f56565"
          }
        ],
        labels: Array.from(this.monthService.getMonthsShort()),
      }
    };
  }

  private updateChart(dataset: AnnualChart) {
    this.annualChart.data.datasets.forEach((data: Dataset) => {
      switch (data.label) {
        case "Balance":
          data.data = dataset.balances;
          break;
        case "Income":
          data.data = dataset.incomes;
          break;
        case "Expense":
          data.data = dataset.expenses;
          break;
      
        default:
          break;
      }
    });

    this.annualChart.update();
  }

  private getOptions() {
    return {
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
  }

  private renderChart() {
    if (this.annualChart != undefined) { this.annualChart.destroy(); }
    this.monthsChartCtx = (<HTMLCanvasElement> document.getElementById("annual-chart")).getContext('2d');
    this.annualChart = new Chart(this.monthsChartCtx, this.annualChartData);
  }

  private hideChart() {
    this.isLoading = true;
    document.getElementById("annual-chart").classList.add("opacity-0");
    try { document.getElementById("annual-chart-legend").classList.add("opacity-0"); }
    catch {}
  }

  private showChart() {
    this.isLoading = false;
    document.getElementById("annual-chart").classList.remove("opacity-0");
    try { document.getElementById("annual-chart-legend").classList.remove("opacity-0"); }
    catch {}
  }
}
