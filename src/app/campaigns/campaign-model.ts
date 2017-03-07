export interface ICampaign {
    name: string,
    description: string,
    status: number,
    start_at: Date,
    end_at: Date
}

export class CampaignModel implements ICampaign {
    constructor (
        public name: string,
        public description: string,
        public status: number,
        public start_at: Date,
        public end_at: Date
    ) {}
}
