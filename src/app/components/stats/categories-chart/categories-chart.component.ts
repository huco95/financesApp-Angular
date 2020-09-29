import { Component, OnDestroy, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { CategoriesChart } from 'src/app/models/charts/categoriesChart';

import { ChartData } from 'src/app/models/charts/chartData';
import { Dataset } from 'src/app/models/charts/dataset';
import { Legend } from 'src/app/models/charts/legend';
import { CategoryService } from 'src/app/services/moves/category.service';
import { MovesService } from 'src/app/services/moves/moves.service';
import { CategoriesChartService } from 'src/app/services/stats/categories-chart.service';

@Component({
  selector: 'app-categories-chart',
  templateUrl: './categories-chart.component.html',
  styleUrls: ['./categories-chart.component.css']
})
export class CategoriesChartComponent implements OnInit, OnDestroy {
  isLoading: boolean;

  categoriesChart: Chart;
  categoriesChartData: ChartData;
  categoriesChartElement: HTMLCanvasElement;
  categoriesChartCtx: CanvasRenderingContext2D;

  subscription: Subscription;

  constructor(
    private movesService: MovesService,
    private categoryService: CategoryService,
    private categoriesChartService: CategoriesChartService) { }

  ngOnInit(): void {
    this.categoriesChartElement = <HTMLCanvasElement> document.getElementById('categories-chart');
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

    this.categoriesChartService.getDataset().subscribe(data => {
      this.createChart(data);

      if (this.categoriesChart != undefined) {
        this.updateChart(data);

      } else {
        this.renderChart();
      }

      this.showChart();
    });
  }

  private createChart(data: CategoriesChart[]) {
    this.categoriesChartData = 
    {
      type: 'doughnut',
      data: {
        datasets: [],
        labels: []
      },
      legends: [],
      options: this.getOptions(),
    };

    let dataset: Dataset = { data: [], backgroundColor: [] };
    let labels: Array<string> = [];
    let legends: Array<Legend> = [];
    data.forEach((categoyData) => {
      let color: string = this.categoryService.getCategoryColor(categoyData.category[0].name, false);
      let name: string = this.capitalizeWords(categoyData.category[0].name);

      dataset.data.push(categoyData.total);
      (dataset.backgroundColor as Array<string>).push(color);

      labels.push(name);
      
      legends.push({
        backgroundColor: color,
        label: name
      });
    });

    this.categoriesChartData.data.datasets.push(dataset);
    this.categoriesChartData.data.labels = labels;
    this.categoriesChartData.legends = legends;
  }

  private updateChart(data: CategoriesChart[]) {
    this.categoriesChart.data.datasets = this.categoriesChartData.data.datasets;
    this.categoriesChart.data.labels = this.categoriesChartData.data.labels;
    this.categoriesChart.legends = this.categoriesChartData.legends;

    this.categoriesChart.update();
  }

  private capitalizeWords(string: string): string {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  }

  private getOptions() {
    return {
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
  }


  private renderChart() {
    if (this.categoriesChart != undefined) { this.categoriesChart.destroy(); }
    this.categoriesChartCtx = this.categoriesChartElement.getContext('2d');
    this.categoriesChart = new Chart(this.categoriesChartCtx, this.categoriesChartData);
  }

  private hideChart() {
    this.isLoading = true;
    document.getElementById("categories-chart").classList.add("opacity-0");
    try { document.getElementById("categories-chart-legend").classList.add("opacity-0"); }
    catch {}
  }

  private showChart() {
    this.isLoading = false;
    document.getElementById("categories-chart").classList.remove("opacity-0");
    try { document.getElementById("categories-chart-legend").classList.remove("opacity-0"); }
    catch {}
  }
}
