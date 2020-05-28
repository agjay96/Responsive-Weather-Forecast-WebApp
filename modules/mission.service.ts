import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor() { }
  hideShowMissionSource = new Subject<boolean>();
  missionAnouncedFavSource = new Subject<any>();

 

  hideShowMission(mission: boolean) {
    this.hideShowMissionSource.next(mission);
  }

  missionAnouncedFav(mission: boolean) {
    this.missionAnouncedFavSource.next(mission);
  }

}
