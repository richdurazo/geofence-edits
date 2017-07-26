export class TriggerModel {
    name: string;
    type: string;
    id?: number;
    campaign_id: number;
    uuid: string;
    delivery_preset_id: number;
    address?: string;
    geometry?: string;
    radius?: string;
    vendor?: string;
    uniqueId?: any;
    latitude?: number;
    longitude?: number;
    active?: string;
    client_id?: string;
    trigger_id?: number;
    triggerable_type?: string;
    triggerable_id?: number;
    file_name?: string;

    constructor (
        name: string,
        type: string,
        uuid: string,
        campaign_id: number,
        delivery_preset_id: number,
        address?: string,
        geometry?: string,
        radius?: string,
        vendor?: string,
        uniqueId?: any,
        latitude?: number,
        longitude?: number,
        active?: string,
        client_id?: string,
        trigger_id?: number,
        triggerable_type?: string,
        triggerable_id?: number,
        file_name?: string


    ) {
        this.name = name;
        this.type = type;
        this.uuid = uuid;
        this.campaign_id = campaign_id;
        this.delivery_preset_id = delivery_preset_id;
        this.address = address;
        this.geometry = geometry;
        this.radius = radius;
        this.vendor = vendor;
        this.uniqueId = uniqueId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.active = active;
        this.client_id = client_id;
        this.trigger_id = trigger_id;
        this.triggerable_type = triggerable_type;
        this.triggerable_id = triggerable_id;
        this.file_name = file_name;

    }
}
