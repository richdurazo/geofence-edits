import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerModel } from '../shared/trigger.model';

@Component({
  selector: 'app-trigger-details',
  templateUrl: './trigger-details.component.html',
  styleUrls: ['./trigger-details.component.scss']
})
export class TriggerDetailsComponent implements OnInit {

    @Input() trigger: TriggerModel;

    id: string;

    triggerType: string;

    private sub: any;

    constructor(private route: ActivatedRoute, private triggerApi: TriggerApiService) { }

    ngOnInit() {
        if (!this.trigger) {
            this.sub = this.route.params.subscribe(params => {
                this.id = params['id'];
                this.getTrigger();
            });
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private getTrigger () {
        this.triggerApi.getTrigger(this.id)
        .subscribe(data => {
            this.trigger = data;
        });
    }

}
