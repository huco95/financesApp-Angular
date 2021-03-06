import { Component, Input, OnInit } from '@angular/core';
import { Legend } from 'src/app/models/charts/legend';

@Component({
  selector: 'app-chart-legend',
  templateUrl: './chart-legend.component.html',
  styleUrls: ['./chart-legend.component.css']
})
export class ChartLegendComponent implements OnInit {
  @Input()
  id: string;

  @Input()
  legends: Legend;

  constructor() { }

  ngOnInit(): void {
  }

}
