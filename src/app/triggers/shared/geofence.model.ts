export class GeofenceModel {
    address: string;
    geometry: any;
    radius: number;

    constructor (
    address: string,
    geometry: any,
    radius: number,

    ) {
    this.address =  address;
    this.geometry = geometry;
    this.radius = radius;
    }
}
