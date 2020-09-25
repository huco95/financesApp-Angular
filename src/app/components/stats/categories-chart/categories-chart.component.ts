import { Component, OnDestroy, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

import { ChartData } from 'src/app/models/stats/chartData';
import { MovesService } from 'src/app/services/moves/moves.service';
import { CategoriesChartService } from 'src/app/services/stats/categories-chart.service';

@Component({
  selector: 'app-categories-chart',
  templateUrl: './categories-chart.component.html',
  styleUrls: ['./categories-chart.component.css']
})
export class CategoriesChartComponent implements OnInit, OnDestroy {
  categoriesChart: Chart;
  categoriesChartData: ChartData;
  categoriesChartCtx: CanvasRenderingContext2D;

  subscription: Subscription;

  constructor(private movesService: MovesService, private categoriesChartService: CategoriesChartService) { }

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
    this.categoriesChartService.getDataset().subscribe(
      categories => {
        this.categoriesChartData = categories;
        this.categoriesChartData.type = 'doughnut';

        this.categoriesChartData.options = {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          cutoutPercentage: 75,
          legend: {
            display: false,
            labels: {
              generateLabels: (chart) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const meta = chart.getDatasetMeta(0);
                    const style = meta.controller.getStyle(i);

                    return {
                      text: label + " [" + data.datasets[0].data[i] + "]",
                      fillStyle: style.backgroundColor,
                      strokeStyle: style.borderColor,
                      lineWidth: style.borderWidth,
                      hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,

                      // Extra data used for toggling the correct item
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          animation: {
            duration: 1500,
            animateScale: false,
            animateRotate: true,
          }
        };

        this.renderChart();
      }
    );
  }

  private renderChart() {
    if (this.categoriesChart != undefined) { this.categoriesChart.destroy(); }
    this.categoriesChartCtx = (<HTMLCanvasElement> document.getElementById("categories-chart")).getContext('2d');
    this.categoriesChart = new Chart(this.categoriesChartCtx, this.categoriesChartData);
  }

}
