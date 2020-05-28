import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HourunitService } from '../../hourunit/hourunit.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  currentTab = "Current";
  isAlreadyStarred = false;

  constructor(private hourUnit:HourunitService) { }

  ngOnInit() {
    this.dataLoaded()
    this.hourUnit.selectedLabel.subscribe(data => {
      this.dataLoaded()
    });
  }

  changeTab(tab) {
    this.currentTab = tab;
  }
  sendToTwitter() {
    var data = environment.data.currently;
    var locationInfo = environment.data.location_info;
    var template = `The current temperature at ${locationInfo.location} is ${data.temperature}F. The weather conditions are ${data.summary}.\n#CSCI571WeatherSearch`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(template)}`, 'blank')
  }
  sendToFavorites() {
    var localData: any = localStorage.getItem("favorites");
    localData = JSON.parse(localData) || [];

    var locationInfo = environment.data && environment.data.location_info;
    var checExisting = localData.findIndex(obj => obj.location && obj.location.indexOf(locationInfo.city) != -1)
    if (checExisting < 0) {
      localData.push(locationInfo);
      this.isAlreadyStarred = true;
    } else {
      localData.splice(checExisting, 1);
      this.isAlreadyStarred = false;
    }
    localStorage.setItem("favorites", JSON.stringify(localData));
  }
  dataLoaded() {
    var localData: any = localStorage.getItem("favorites");
    localData = JSON.parse(localData) || [];

    var locationInfo = environment.data && environment.data.location_info;
    if (locationInfo) {
      var checExisting = localData.findIndex(obj => obj.location && obj.location.indexOf(locationInfo.city) != -1);
      this.isAlreadyStarred = checExisting > -1;
    }
  }

}
