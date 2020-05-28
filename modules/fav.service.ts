import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor() { }
  favSources = new Subject<any>();
  favor(mission: boolean) {
    this.favSources.next(mission);
  }

}
