import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HourunitService } from '../hourunit/hourunit.service';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {

  label = 'temperature';
  data = [];

  hourlys = [
    { value: 'temperature', label: 'Temperature' },
    { value: 'pressure', label: 'Pressure' },
    { value: 'humidity', label: 'Humidity' },
    { value: 'ozone', label: 'Ozone' },
    { value: 'visibility', label: 'Visibility' },
    { value: 'windSpeed', label: 'Wind Speed' },
  ]
  constructor(private hourUnit:HourunitService) { }

  ngOnInit() {
    this.graphData();
    this.hourUnit.selectedLabel.subscribe((data) => {
      this.graphData();
    })
  }

  changeGr() {
    this.graphData();
  }

  graphData() {
    let tempArray = []
      for (var i = 0; i < 24; i++) {
        tempArray.push(environment.data.hourly.data[i][this.label]);
      }
    this.data = tempArray;
  }
}
