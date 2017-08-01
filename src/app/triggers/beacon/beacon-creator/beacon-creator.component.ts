import { TriggerApiService } from './../../shared/trigger-api.service';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BeaconModel } from './../../shared/beacon.model';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgZone, Input, AfterViewInit } from '@angular/core';
declare var google;

@Component({
  selector: 'app-beacon-creator',
  templateUrl: './beacon-creator.component.html',
  styleUrls: ['./beacon-creator.component.scss']
})

export class BeaconCreatorComponent implements OnInit, AfterViewInit{

    @Output() onCreate: EventEmitter<any> = new EventEmitter();

    @Input() beacon: any;

    beacons: BeaconModel[]=[];

    beaconCreated: boolean = false;

    currentPosition: boolean = true;

    editMode: boolean = false;

    uuid: string;

    latitude: number;

    longitude: number;

    zoom: number;

    searchControl: FormControl;

    beaconForm: FormGroup;

    triggerId: number;

    address: string;

    markers: Array<LatLngLiteral> = [];


  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor( private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone,
               public triggerApi: TriggerApiService ) {
                                                  }


  ngOnInit() {
    let beaconId = '';
    let beaconType = '';
    let beaconAddress = '8750 wilshire';
    let beaconLat: number = 34.0664201;
    let beaconLng: number = -118.38325739999999;

    if(this.beacon) {
      this.editMode = true;

      beaconId = this.beacon.unique_id;
      beaconType = this.beacon.vendor;
      beaconAddress = this.beacon.address;
      beaconLat = parseFloat(this.beacon.latitude);
      beaconLng = parseFloat(this.beacon.longitude);
      this.zoom = 16;
      this.latitude = beaconLat;
      this.longitude = beaconLng;
      this.markers = [{lat: beaconLat, lng: beaconLng}];
      this.searchControl = new FormControl(beaconAddress);


    }
             this.markers = [{lat:0, lng:0}]

          this.zoom = 16;
          this.latitude = 34.0664201;
          this.longitude = -118.38325739999999;

          this.searchControl = new FormControl(beaconAddress);
          this.initBeacon();

          this.beaconForm = new FormGroup({
            'id': new FormControl(beaconId),
            'type': new FormControl(beaconType),
            'lat': new FormControl({value: beaconLat, disabled: true}),
            'lng': new FormControl({value: beaconLng, disabled: true}),
            'search': this.searchControl
          });


    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      console.log(autocomplete)
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address = place.formatted_address;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          this.beaconForm.patchValue({
          'lat': this.latitude,
          'lng': this.longitude
        });
        });
      });
    });
  }
  ngAfterViewInit() {
    console.log('hi')
  }
  onSubmit() {
    this.beaconCreated = true;
    this.beacon = new BeaconModel(
      this.beaconForm.value['type'],
      this.beaconForm.value['id'],
      this.address,
      this.latitude,
      this.longitude,
      "1",
      "1"
      );
    this.beacons.push(this.beacon);
    this.processSuccess(this.beacon);
    this.markers.push({lat: this.latitude, lng: this.longitude});
  }

  initBeacon() {
    if (!this.beacon) {
      this.beacon = new BeaconModel('', '', '', 0, 0, '', '');
    }
    this.beacon = new BeaconModel(this.beacon.vendor, this.beacon.unique_id, this.beacon.address, this.beacon.latitude, this.beacon.latitude, this.beacon.active, this.beacon.client_id)
  }

/*  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      this.currentPosition = false;
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
        this.beaconForm.patchValue({
          'lat': this.latitude,
          'lng': this.longitude
        });
        this.spinnerSwitch(position)
      });
    }
  }*/

  processSuccess(data) {
    if (this.onCreate) {
        this.onCreate.emit(data);
        this.reset();
    }
  }

  public reset() {
    this.initBeacon();
  }

  spinnerSwitch(position) {
    this.currentPosition = true;
  }

}



