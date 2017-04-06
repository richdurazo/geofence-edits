export class TriggerModel {
    name: string;
    value: number;
    campaign_id: string;
    type: string;

    constructor (
        name: string,
        type: string
    ) {
        this.name = name;
        this.type = type;
    }
}