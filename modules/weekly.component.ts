import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HourunitService } from '../hourunit/hourunit.service';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {
  data = [];
  barChartOptions = {
    responsive: true,
    scaleShowVerticalLines: false,
    scaleShowValues: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10,
        },
        render: function (args) {
          console.log(args)
        }
      }
    },
    scales: {
      xAxes: [{
        barThickness: 15,
        maxBarThickness: 15,
        scaleLabel: {
          display: true,
          labelString: "Temperature in Fahrenheit"
        }
      }],
      yAxes: [{
        barThickness: 15,
        maxBarThickness: 15,
        scaleLabel: {
          display: true,
          labelString: "Days"
        }
      }]
    },
    toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
  };
  barChartLabels = this.startAndEndOfWeek();
  barChartType = 'horizontalBar';
  barChartLegend = true;
  barChartData = [{ data: [], label: "Day wise temperature range", backgroundColor: '#87cefa', hoverBackgroundColor: '#87cefa', toolTipContent: "" }];

  public barChartPlugins = [pluginDataLabels];


  iconMapping = {
    "clear-day": "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png",
    "clear-night": "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png",
    rain: "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png",
    snow: "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png",
    sleet: "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png",
    wind: "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png",
    fog: "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png",
    cloudy: "This icon for this is https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png",
    "partly-cloudy-day": "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png",
    "partly-cloudy-night": "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png"
  }

  constructor(private http: HttpClient, private hourUnit:HourunitService) { }

  ngOnInit() {
    this.getData();
    this.hourUnit.selectedLabel.subscribe((data) => {
      this.getData();
    })
  }

  overallData: any = {}

  getData() {
    let temp = environment.data;
    let tempArray = [];
    if (temp) {
      this.overallData = temp.daily;
      for (var i = 0; i < 7; i++) {
        tempArray.push([parseInt(temp.daily.data[i].temperatureLow), parseInt(temp.daily.data[i].temperatureHigh)]);
      }
    }
    this.barChartData = [{ data: tempArray, label: "Day wise temperature range", backgroundColor: '#87cefa', hoverBackgroundColor: '#87cefa', toolTipContent: '{x}: {y}' }]
  }
  myModal = false;
  indexer = null;
  tempObj: any = {
    currently: {},
    location_info: {}
  }
  chartClicked(e: any) {
    this.indexer = e.active && e.active[0] && e.active[0]._index;
    this.http.post("http://localhost:8080/getWether", { lat: environment.data.latitude, lng: environment.data.longitude, time: this.overallData.data[this.indexer].time }).subscribe(data => {
      this.tempObj = data;
      this.tempObj.location_info = environment.data.location_info;
      this.myModal = true
    })
  }


  startAndEndOfWeek(startDate?) {
    var now = startDate ? new Date(startDate) : new Date();
    now.setHours(0, 0, 0, 0);

    var first = new Date(now);
    first.setDate(first.getDate() - first.getDay());
    var month1: any = first.getMonth() + 1;
    var date1: any = first.getDate();
    month1= month1<10 ? "0"+month1 : month1
    date1= date1<10 ? "0"+date1 : date1
    var firsDate = date1 + "/" + month1 + "/" + first.getFullYear();

    var last = new Date(now);
    last.setDate(last.getDate() - last.getDay() + 6);
    var month2: any = last.getMonth() + 1;
    var date2: any = last.getDate();
    month2= month2<10 ? "0"+month2 : month2
    date2= date2<10 ? "0"+date2 : date2
    var lastDate = date2 + "/" + month2 + "/" + last.getFullYear();
    

    var inbetweenDates = [firsDate];
    while (first < last) {
      first.setTime(first.getTime() + 24 * 60 * 60 * 1000);
      var months: any = first.getMonth() + 1;
      var dates: any = first.getDate();
      months= months<10 ? "0"+months : months
      dates= dates<10 ? "0"+dates : dates
      inbetweenDates.push(dates + "/" + months + "/" + first.getFullYear());
    }
    return inbetweenDates;
  }
  chartHovered(ev) {
  }
}
