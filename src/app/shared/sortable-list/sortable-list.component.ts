import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-sortable-list',
    templateUrl: './sortable-list.component.html',
    styleUrls: ['./sortable-list.component.scss']
})
export class SortableListComponent implements OnInit {

    headers: [
        {
            value: "name",
            viewValue: "Name"
        },
        {
            value: "start_at",
            viewValue: "Start Date"
        },
        {
            value: "start_at",
            viewValue: "Start Date"
        },
        {
            value: "end_at",
            viewValue: "End Date"
        },
        {
            value: "action",
            viewValue: "Actions"
        }
    ]

    @Input() listTitle: string;

    @Input() rows: Array<any>;

    constructor() { }

    ngOnInit() {
        this.headers = [
            {
                value: "name",
                viewValue: "Name"
            },
            {
                value: "start_at",
                viewValue: "Start Date"
            },
            {
                value: "start_at",
                viewValue: "Start Date"
            },
            {
                value: "end_at",
                viewValue: "End Date"
            },
            {
                value: "action",
                viewValue: "Actions"
            }
        ]
    }

}
