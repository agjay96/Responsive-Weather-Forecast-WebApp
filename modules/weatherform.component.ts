import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationCallService } from '../location/location-call.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MissionService } from '../mission/mission.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-weatherform',
    templateUrl: './weatherform.component.html',
    styleUrls: ['./weatherform.component.css']
})
export class WeatherFormComponent implements OnInit {
    model: any = {};
    @Output() wetherClick = new EventEmitter<any>();
    @Output() processClick = new EventEmitter<any>();
    //@Output() error = new EventEmitter<any>();

    constructor(private fb: FormBuilder, 
    private address: LocationCallService, 
    private http: HttpClient, 
    private missionService: MissionService, 
    private router:Router) { }
    wetherForm: FormGroup
    states = [
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        {
            "name": "American Samoa",
            "abbreviation": "AS"
        },
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        {
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },
        {
            "name": "Federated States Of Micronesia",
            "abbreviation": "FM"
        },
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        {
            "name": "Guam",
            "abbreviation": "GU"
        },
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        {
            "name": "Marshall Islands",
            "abbreviation": "MH"
        },
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "abbreviation": "MP"
        },
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        {
            "name": "Palau",
            "abbreviation": "PW"
        },
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        {
            "name": "Puerto Rico",
            "abbreviation": "PR"
        },
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        {
            "name": "Virgin Islands",
            "abbreviation": "VI"
        },
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ]
    wether = {
        street: '',
        city: '',
        state: ''
    };
    location = {
        "lat": 37.4215785,
        "lng": -122.0837816,
        "location": "",
        "city": ""
    };
    ngOnInit() {
        this.formRender();
        this.missionService.missionAnouncedFavSource.subscribe(data => {
            this.fromFavTab(data)
        });
    }
    fromFavTab(loc) {
        this.search_address(loc);
        this.router.navigate(["/result"])
    }
    formRender() {
        this.wetherForm = this.fb.group({
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ["", Validators.required],
            current: [false]
        })
    }

    predictions = [];
    keyword = "name";
    errorMsg = ""
    onChangeSearch(ev) {
        // this.wetherForm.controls.city.enable();
        this.address.getLocation(ev).subscribe(
            (data: any) => {
                this.predictions = data.predictions.map(obj => {
                    return { name: obj.structured_formatting.main_text, id: obj.id, place_id: obj.place_id }
                });
            },
            error => {
                console.log("Error : ", error)
            });
    }

    selectEvent(obj) {
        this.wetherForm.patchValue({ 'city': obj.name });
    }
    
    street_error = false;
    city_error = false;
    state_error = false;


    async onSearch() {
        this.street_error = false;
        this.city_error = false;
        this.state_error = false;
        this.errorMsg = "";
        this.wether = this.wetherForm.value;

        if (this.wetherForm.value.current) {
            this.location = await this.getPosition();
            this.getWether();
            this.missionService.hideShowMission(true);
        } else {
            if (this.wether.street == null || !this.wether.street.trim()) {
                this.street_error = true;
            }
            if (this.wether.city == null || !this.wether.city) {
                this.city_error = true;
            }
            if (this.wether.state == null || !this.wether.state ) {
                this.state_error = true;
            }
            if (this.street_error || this.city_error || this.state_error) {
                this.errorMsg = 'No Records';
                this.missionService.hideShowMission(false);
                return;
            }

            if(!this.wether.city['name'] || !(/^[a-z0-9\s]+$/i.test(this.wether.city['name'])) || !(/^[a-z0-9\s]+$/i.test(this.wether.street))){
                this.errorMsg = 'Invalid Address';
                this.missionService.hideShowMission(false);
                return;
            }

            var city = this.wether.city['name'] || this.wether.city;
            return this.search_address(this.wether.street + ',' + city + ',' + this.wether.state);
        }
    }

    search_address(addr) {
        this.address.getLatLong(addr).subscribe(
            data => {
                this.errorMsg = "";

                if (data.status == "ZERO_RESULTS") {
                    this.errorMsg = "Invalid Address";
                    this.missionService.hideShowMission(false);
                } else {
                    
                    this.location = data.results[0].geometry.location;
                    this.location.location = this.wether.street+","+this.wether.city['name']+","+this.wether.state;
                    this.location.city = this.wether.city['name'];
                    this.getWether();
                    this.missionService.hideShowMission(true);
                }
            },
            error => { console.log("Error : ", error) })
    }

    onClear() {
        this.errorMsg = "";
        this.wetherForm.reset();
        this.wetherForm.patchValue({ state: '' });

        this.state_error = false;
        this.city_error = false;
        this.street_error = false;

        this.wetherForm.controls.street.enable();
        this.wetherForm.controls.city.enable();
        this.wetherForm.controls.state.enable();

        this.missionService.hideShowMission(false);
    }

    getWether() {
        this.processClick.emit(true);
        this.address.getWether(this.location).subscribe(
            data => {
                data.location_info = this.location;
                this.wetherClick.emit(data);
                this.processClick.emit(false);
            },
            error => {
                this.errorMsg = 'Invalid Address';
                this.missionService.hideShowMission(false);
                console.log("Error : ", error);
                this.processClick.emit(false);
                //this.error.emit(error);
            }
        )
    }
    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.address.getIPLocation().subscribe(resp => {

                var info = { lng: resp.lon, lat: resp.lat, location:"", city: resp.city }
                this.http.post("http://localhost:8080/locationInfo", { info }).subscribe((data: any) => {
                    
                    info.location = " ,"+info.city+","+resp.region;
                    info.city = resp.city;


                    resolve(info);
                });
            }, err => {
                this.errorMsg = 'Invalid Address';
                this.missionService.hideShowMission(false);
                reject(err);
            });
        });
    }
    onCheckBoxClick() {
        if (!this.wetherForm.value.current) {
            this.errorMsg = "";
            this.wetherForm.patchValue({ state: '' });
            this.wetherForm.patchValue({ city: '' });
            this.wetherForm.patchValue({ street: '' });

            this.state_error = false;
            this.city_error = false;
            this.street_error = false;

            this.wetherForm.controls.street.disable();
            this.wetherForm.controls.city.disable();
            this.wetherForm.controls.state.disable();
        } else {
            this.wetherForm.controls.street.enable();
            this.wetherForm.controls.city.enable();
            this.wetherForm.controls.state.enable();
        }
    }
}
