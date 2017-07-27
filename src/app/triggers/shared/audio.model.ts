export class AudioModel {
    name: string;
    id?: number;
    uuid: string;
    delivery_preset_id: number;
    campaign_id: number;
    file_name: string;

    constructor (
        name: string,
        uuid: string,
        delivery_preset_id: number,
        campaign_id: number,
        file_name?: string


    ) {
        this.name = name;
        this.uuid = uuid;
        this.delivery_preset_id = delivery_preset_id;
        this.campaign_id = campaign_id;
        this.file_name = file_name;

    }
}
