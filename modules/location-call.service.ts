import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationCallService {

  constructor(private httpClient: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
    })
  }

  getLocation(input) {
    //console.log("Calling");
    return this.httpClient.post<any>('http://localhost:8080/address', {
      "cities": input
    }, this.httpOptions)
  }

  getIPLocation(){
      return this.httpClient.get<any>("http://ip-api.com/json/")
    }
  getLatLong(address) {
    return this.httpClient.post<any>('http://localhost:8080/geocode', {
      "address": address
    }, this.httpOptions)
  }

  getWether(location) {
    return this.httpClient.post<any>('http://localhost:8080/getWether', location, this.httpOptions)
  }

  getCustomizeData(obj) {
    return this.httpClient.post<any>('http://localhost:8080/getCustomization', obj, this.httpOptions)
  }
}
