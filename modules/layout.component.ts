import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MissionService } from '../../mission/mission.service';
import { HourunitService } from '../../hourunit/hourunit.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  constructor(private missionSerive: MissionService,
  private hourUnit:HourunitService) { }

  data = null;
  process = false;
  error = null;

  notYetSearched = true;
  errorHappened = false;

  hideTabs = false;

  fav = false;
  ngOnInit() {
    this.fav = location.pathname == "/favorites";
    this.missionSerive.hideShowMissionSource.subscribe(data => {
      this.hideTabs = !data;
    })
  }

  showFav(clickFav) {
    this.fav = clickFav;
  }

  _wetherClick(event) {
    this.notYetSearched = false;
    environment.data = event;
    this.data = event;
    console.log("WETHER Enviroment : ", environment.data, this.data, '?#$#$#$');
    this.hourUnit.selectedLabelNext(Math.random())
  }


  _process(event) {
    this.notYetSearched = false;
    console.log("Process :", event)
    this.process = event
  }
  

}
