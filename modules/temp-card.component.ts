import { Component, OnInit, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';
import { LocationCallService } from '../location/location-call.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HourunitService } from '../hourunit/hourunit.service';

@Component({
  selector: 'app-temp-card',
  templateUrl: './temp-card.component.html',
  styleUrls: ['./temp-card.component.css']
})
export class TempCardComponent implements OnInit {

  constructor(private locationServices: LocationCallService, private http: HttpClient,private hourUnit:HourunitService) { }
  tempObj: any = {
    currently: {},
    location_info: {}
  }
  imgUrl = null;
  ngOnInit() {
    this.getData();
    this.hourUnit.selectedLabel.subscribe((data)=>{
      this.getData();
    })
  }

  ngOnChanges() {
    this.getData();
  }

  @Output() dataLoaded = new EventEmitter();
  getData() {
    let temp = environment.data; //localStorage.getItem('wether')
    if (temp) {
      this.tempObj = temp
      //console.log("Temp card : ", temp);
      this.getCustomization();
      this.dataLoaded.emit()
    } else {
      this.retry();
    }
  }

  getCustomization() {
    var loc = this.tempObj.location_info.location.split(',');
    let city = loc[1]
    let state = loc[2]

    this.imgUrl = null;
    this.http.post("http://localhost:3000/getCustomization", { state }).subscribe((data: any) => {
      //console.log(".........getCustomization...............", data)
      this.imgUrl = data && data.items && data.items[0] && data.items[0].link;
      environment.data.location_info.imgUrl = this.imgUrl;
    });
  }

  retry() {
    setTimeout(() => {
      this.getData();
    }, 1000)
  }

}
