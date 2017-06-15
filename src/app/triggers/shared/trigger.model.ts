export class TriggerModel {
    name: string;
    type: string;
    id?: number;
    campaign_id: number;
    uuid: string;
    delivery_mode_id: number;

    constructor (
        name: string,
        type: string,
        uuid: string
    ) {
        this.name = name;
        this.type = type;
        this.uuid = uuid;
    }
}
