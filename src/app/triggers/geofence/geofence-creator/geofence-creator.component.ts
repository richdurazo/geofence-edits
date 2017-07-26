import { TriggerModel } from './../../shared/trigger.model';
import { GeofenceModel } from './../../shared/geofence.model';
import { TriggerApiService } from './../../shared/trigger-api.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { LatLng, LatLngLiteral, PolyMouseEvent } from '@agm/core';
import { AfterContentInit, Directive, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-geofence-creator',
  templateUrl: './geofence-creator.component.html',
  styleUrls: ['./geofence-creator.component.scss']
})

export class GeofenceCreatorComponent implements OnInit {

  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  @Input() trigger: TriggerModel;

  @Input() editGeofence: GeofenceModel;

  radiusChange: EventEmitter<number> = new EventEmitter<number>();

  editMode: boolean = false;

  currentPosition: boolean = true;

  @Input() geofence: GeofenceModel;

  coordinates: any;

  geofenceName: string;

  latitude: number;

  longitude: number;

  zoom: number;

  searchControl: FormControl;

  geofenceForm: FormGroup;
  
  geofenceCreated: boolean = false;

  triggerId: number;

  address: string = '';

  radius: number;

  type: string = 'Point';

  paths: Array<LatLngLiteral>;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
               private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone,
               public triggerApi: TriggerApiService ) {}

  ngOnInit() {
    console.log(this.geofence)
      this.searchControl = new FormControl(this.address);
      console.log('onInit', this.searchControl)
      this.initForm();
      this.zoom = 16;

    if (!this.geofence) {
      this.initGeo();
      this.latitude = 34.0664201;
      this.longitude = -118.38325739999999;
      this.radius = 300;
    } else {
      console.log('we made it', this.geofence)
      this.address = this.geofence.address;
      this.searchControl = new FormControl(this.address);
      console.log(this.searchControl, this.address, this.searchElementRef)
      this.latitude = this.geofence.geometry.coordinates[1];
      this.longitude = this.geofence.geometry.coordinates[0];
      this.initForm();
    }
    this.geofenceForm.valueChanges
       .subscribe(value => {
         this.radius = value.rad
       });


    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
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
        this.geofenceForm.patchValue({
          'lat': this.latitude,
          'lng': this.longitude
        });     
          this.coordinates = [this.longitude, this.latitude];
          this.zoom = 16;

        });
      });
    });
  }

  private initForm() {
      let geofenceType = 'Point';
      let geofenceAddress = '';
      let geofenceCoordinates = new FormArray([]);
      let geofenceRadius = 300;
      let lat = 34.0664201;
      let lng = -118.38325739999999;

    if (this.geofence) {
      geofenceType = this.geofence.geometry['type'];
      geofenceAddress = this.geofence.address;
      geofenceCoordinates = this.geofence.geometry.coordinates;
      lat = this.geofence.geometry.coordinates[1];
      lng = this.geofence.geometry.coordinates[0];
      geofenceRadius = this.geofence.radius;

     }

    // if (this.editMode) {
    //   geofenceName = this.geofenceForm.value.name;
    //   geofenceType = this.geofenceForm.value.type;
    //   geofenceAddress = new FormControl(this.address);
    //   geofenceCoordinates.push(
    //     new FormGroup({
    //       'lat': new FormControl({value: this.latitude, disabled: true}),
    //       'lng': new FormControl({value: this.longitude, disabled: true})
    //     })
    //   )
    // }
    this.geofenceForm = new FormGroup({
      'type': new FormControl({value: geofenceType, disabled: true}),
      'search': new FormControl(geofenceAddress),
      'rad' : new FormControl(geofenceRadius, Validators.required),
      'paths': geofenceCoordinates,
      'lat': new FormControl({value: lat, disabled: true}),
      'lng': new FormControl({value: lng, disabled: true}),
    });
  }


  onSubmit() {
    this.geofenceCreated = true;
    let rad = this.radius;
    let location = JSON.stringify({type: "Point", coordinates: this.coordinates})
    let geofence = {address: this.address, geometry: location, radius: rad};
    this.geofence = geofence;
    let obj = Object.assign({}, this.geofence);
    this.processSuccess(this.geofence);
  }
  initGeo() {
    this.geofence = new GeofenceModel(
      '',
      '',
      null
    );
  }

  private setCurrentPosition() {
     this.currentPosition = false;
     let currentAddress: string = '';
    if ("geolocation" in navigator) {
      let geocoder = new google.maps.Geocoder;
      let infowindow = new google.maps.InfoWindow;

      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.geofenceForm.patchValue({
          'lat': this.latitude,
          'lng': this.longitude
        });
        this.spinnerSwitch(position)
        let latlng = {lat: this.latitude, lng: this.longitude};
        this.getAddress(latlng, geocoder)
      });
    }
  }

  getAddress(latlng, geocoder) {
      geocoder.geocode({'location': {lat: this.latitude, lng: this.longitude}}, function(results, status) {
          if (results[0]) {
            this.address = results[0].formatted_address;
            this.searchControl = new FormControl(this.address);
          }
        });
        this.geofenceForm.patchValue({
          'search': this.address,
          'searchControl': this.searchControl
        });
  }

  spinnerSwitch(position) {
    this.currentPosition = true;
  }

   processSuccess(data) {
        if (this.onCreate) {
            this.onCreate.emit(data);
        }
  }

  onRadiusChange(data) {
    if(this.radiusChange) {
      this.radiusChange.emit(data)
      this.radius = data;
      console.log(this.radius)
      this.geofenceForm.patchValue({
        'rad': this.radius
      });
    }
  }


}



