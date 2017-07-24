export class ContentModel {
    uuid: string;
    id?: number;
    type: string;
    name: string;
    display_name: string;
    description: string;
    scratcher_enabled: boolean;
    scratcher_name?: string;
    scratcher_description?: string;
    redemption_method: number;
    redemption_code?: string;
    redemption_code_format?: any;
    redemption_url?: string;
    quantity: number;
    start_at: any;
    end_at: any;
    content_term_id: number;

    constructor (
        uuid: string,
        type: string,
        name: string,
        display_name: string,
        description: string,
        start_at: any,
        end_at: any,
        scratcher_enabled: boolean,
        redemption_method: number,
        redemption_code: string,
        content_term_id: number,

    ) {
        this.uuid = uuid;
        this.type = type;
        this.name = name;
        this.display_name = display_name;
        this.description = description;
        this.start_at = start_at;
        this.end_at = end_at;
        this.scratcher_enabled = false;
        this.redemption_method = redemption_method;
        this.redemption_code = redemption_code;
        this.content_term_id = content_term_id;
    }

}
