import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LocationCallService } from '../location/location-call.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],

})
export class GraphComponent implements OnChanges {

  @Input('data') data: any;
  @Input('label') label: any;

  barChartOptions = {
  };
  barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [];

  constructor() {

  }
  mapUnits = {
    temperature: "Fahrenheit",
    pressure: "Millibars",
    humidity: "%",
    ozone: "Dobson Units",
    windSpeed: "Miles per hour"
  }

  ngOnInit() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
       xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour"
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.mapUnits[this.label]
          }
        }]
      }
    };
    this.barChartData = [{ data: this.data, 
    label: this.label, 
    backgroundColor: '#91D8FA', 
    hoverBackgroundColor: '#6D9AB0' }]
  }

  ngOnChanges() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.mapUnits[this.label]
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour"
          }
        }]
      }
    };
    this.barChartData = [{ data: this.data, 
    label: this.label, 
    backgroundColor: '#91D8FA', 
    hoverBackgroundColor: '#6D9AB0' }]
  }

}
