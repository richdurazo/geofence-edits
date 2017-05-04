export class TriggerModel {
    name: string;
    type: string;
    id: number;
    campaign_id: number;

    constructor (
        name: string,
        type: string
    ) {
        this.name = name;
        this.type = type;
    }
}
