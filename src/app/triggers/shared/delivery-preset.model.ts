export class DeliveryPresetModel {
    public id: number;
    public name: string;
    public mode: number;
    public uuid: string;

    constructor( id: number, name: string, mode: number, uuid: string ) {
        this.id = id;
        this.name = name;
        this.mode = mode;
        this.uuid = uuid;
    }
}