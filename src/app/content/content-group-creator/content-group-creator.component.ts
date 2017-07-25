import { DeliveryPresetApiService } from './../../triggers/delivery-preset/delivery-preset-api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TriggerApiService } from '../../triggers/shared/trigger-api.service';
import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

import { ContentGroupModel } from '../shared/content-group.model';

@Component({
    selector: 'app-content-group-creator',
    templateUrl: './content-group-creator.component.html',
    styleUrls: ['./content-group-creator.component.scss']
})
export class ContentGroupCreatorComponent implements OnInit {

    @Output() onCreate: EventEmitter<any> = new EventEmitter();

    @Input() contentGroup: ContentGroupModel;

    @Input() trigger: any;

    @Input() deliveryPreset: any;

    contentOptions: ContentModel[] = [];

    groupContent: ContentModel[] = [];

    selectedContent: ContentModel;

    creating: boolean = true;

    constructor(public contentApi: ContentApiService,
                public triggerApi: TriggerApiService,
                public deliveryPresetApi: DeliveryPresetApiService) { }

    ngOnInit() {
        if (!this.contentGroup) {
            this.contentGroup = new ContentGroupModel('', this.deliveryPreset.id);
        } else {
            this.getContent();
            this.getGroupContent();
            this.creating = false;
        }
    }

    public submitForm (form) {
        if (form.valid) {
            console.log('submitted form and the content group', form, this.contentGroup)
            this.contentApi.createContentGroup(this.contentGroup)
            .subscribe(data => {
                console.log('subscripe from after the content is created', data)
                this.processSuccess(data);
            })
        }
    }

        // why attach contentGroup? 
        // when I post gontent group it contains delivery presetID which is a foriegn key
        // post to contentGroup doen't work without delivery_preset_id

/*    public attachContentGroup (data) {
        this.deliveryPresetApi.attachContentGroup(this.deliveryPreset.id, data.id)
        .subscribe(content => {
            this.processSuccess(data);
        })
    }*/

    public processSuccess (data) {
        if (this.onCreate) {
            this.onCreate.emit(data);
        }
    }

    public setContent (event) {
        this.selectedContent = event;
    }

    public attachContent () {
        this.contentApi.attachContentToGroup(this.contentGroup.id, this.selectedContent.id)
        .subscribe(data => {
            this.groupContent = data;
        });
    }

    public getContent () {
        this.contentApi.getContent()
        .subscribe(data => {
            this.contentOptions = data;
        });
    }

    public getGroupContent () {
        this.contentApi.getGroupContent(this.contentGroup.id)
        .subscribe(data => {
            this.groupContent = data;
        })
    }

}
