import { Component, OnInit, Input, NgZone } from '@angular/core';
import { MarkerManager, MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @Input() latitude: number;
    @Input() longitude: number;

  

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) { }

  ngOnInit() {
          this.latitude = 34.0664201;
          this.longitude = -118.38325739999999;
    this.mapsAPILoader.load();/*.then(() => {
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
          this.zoom = 12;

          this.beaconForm.patchValue({
          'lat': this.latitude,
          'lng': this.longitude
        });
        });
      });
    });*/
  }


}
