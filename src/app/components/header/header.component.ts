import { Component, OnInit } from '@angular/core';
import { MonthService } from 'src/app/services/month/month.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private test: MonthService) { }

  ngOnInit(): void {
  }

}
