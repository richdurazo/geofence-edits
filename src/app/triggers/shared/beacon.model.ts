export class BeaconModel {
    vendor: string;
    uniqueId: any;
    address: string;
    latitude: number;
    longitude: number;
    active: string;
    client_id: string;
    constructor (
        vendor: string,
        uniqueId: any,
        address: string,
        latitude: number,
        longitude: number,
        active: string,
        client_id: string

    ) {
        this.vendor = vendor;
        this.uniqueId = uniqueId;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.active = active;
        this.client_id = client_id;
    }
}
