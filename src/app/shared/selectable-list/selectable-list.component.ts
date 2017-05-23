import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-selectable-list',
    templateUrl: './selectable-list.component.html',
    styleUrls: ['./selectable-list.component.scss']
})
export class SelectableListComponent implements OnInit {

    tiles: {
        rows: number;
        columns: number;
    };

    tileRows: number;

    selectedItem: any;

    @Input() rows: Array<any>;

    @Input() root: string;

    @Output() emitSelectedItem: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    public itemSelected (event) {
        this.emitSelectedItem.emit(this.selectedItem);
    }


}
