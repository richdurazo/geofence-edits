export class TriggerModel {
    name: string;
    type: string;
    id?: number;
    campaign_id: number;
    uuid: string;
    delivery_preset_id: number;

    constructor (
        name: string,
        type: string,
        uuid: string,
        campaign_id: number,
        delivery_preset_id: number
    ) {
        this.name = name;
        this.type = type;
        this.uuid = uuid;
        this.campaign_id = campaign_id;
        this.delivery_preset_id = delivery_preset_id;
    }
}
