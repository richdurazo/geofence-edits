export class DeliveryModeModel {
    public id: number;
    public name: string;
    public multiple: boolean;
    public random: boolean;

    constructor( id: number, name: string ) {
        this.id = id;
        this.name = name;
    }
}