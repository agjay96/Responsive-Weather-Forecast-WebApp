import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HourunitService {

  constructor() { }
  selectedLabel = new Subject<number>();

  selectedLabelNext(mission: number) {
    this.selectedLabel.next(mission);
  }

}
