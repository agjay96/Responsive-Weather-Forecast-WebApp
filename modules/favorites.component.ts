import { Component, OnInit } from '@angular/core';
import { MissionService } from '../mission/mission.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  storageItems: any = [];

  constructor(private missionService:MissionService) { }

  ngOnInit() {
    this.storageItems = localStorage.getItem("favorites");
    this.storageItems = this.storageItems ? JSON.parse(this.storageItems) : [];
  }

  deleteItem(index) {
    this.storageItems.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(this.storageItems));
  }

  loadCurrentFavorite(loc){
    this.missionService.missionAnouncedFav(loc);
  }

}
