export class BeaconModel {
    vendor: string;
    unique_id: any;
    address: string;
    latitude: number;
    longitude: number;
    active: string;
    client_id: string;
    constructor (
        vendor: string,
        unique_id: any,
        address: string,
        latitude: number,
        longitude: number,
        active: string,
        client_id: string

    ) {
        this.vendor = vendor;
        this.unique_id = unique_id;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.active = active;
        this.client_id = client_id;
    }
}
