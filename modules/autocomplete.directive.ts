import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LocationCallService } from '../location/location-call.service';

@Directive({
  selector: '[autocomplete]'
})

export class AutocompleteDirective {
  constructor(private element_ref: ElementRef,
  private address:LocationCallService ) { }

  @HostListener('input', ['$event']) onInputChange(event) {

      this.address.getLocation(this.element_ref.nativeElement.value).subscribe(
        data=>{console.log("Data : ",data)
          data.predictions.forEach(element=>{
              let val = element.structured_formatting.main_text;
              console.log("Valueeeee : ",val);
          })
      },
      error=>{console.log("Error : ",error)})
  }


}
