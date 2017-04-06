export class ContentModel {
    uuid: string;
    id: string;
    type: string;
    name: string;
    display_name: string;
    description: string;
    quantity: number;
    start_at: Date;
    end_at: Date;

    constructor (
        uuid: string,
        type: string,
        name: string,
        display_name: string,
        description: string,
        start_at: Date,
        end_at: Date
    ) {
        this.uuid = uuid;
        this.type = type;
        this.name = name;
        this.display_name = display_name,
        this.description = description;
        this.start_at = start_at;
        this.end_at = end_at;
    }

}
