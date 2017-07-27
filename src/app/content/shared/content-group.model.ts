export class ContentGroupModel {
    id?: number;
    name: string;
    delivery_preset_id: number;

    constructor (name: string, delivery_preset_id: number) {
        this.name = name;
        this.delivery_preset_id = delivery_preset_id;
    };

}
