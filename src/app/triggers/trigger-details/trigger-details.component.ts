import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerModel } from '../shared/trigger.model';

@Component({
  selector: 'app-trigger-details',
  templateUrl: './trigger-details.component.html',
  styleUrls: ['./trigger-details.component.scss']
})
export class TriggerDetailsComponent implements OnInit {

    trigger: TriggerModel;

    id: string;

    triggerType: string;

    private sub: any;

    constructor(private route: ActivatedRoute, private triggerApi: TriggerApiService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('this.id', this.id);
            this.getTrigger();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getTrigger () {
        this.triggerApi.getTrigger(this.id)
        .subscribe(data => {
            this.trigger = data;
            // this.triggerType = this.trigger.type;
            console.log('this.trigger', this.trigger);
        });
    }

}
