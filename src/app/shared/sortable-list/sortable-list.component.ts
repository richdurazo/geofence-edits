import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-sortable-list',
    templateUrl: './sortable-list.component.html',
    styleUrls: ['./sortable-list.component.scss']
})
export class SortableListComponent implements OnInit {

    tiles: {
        rows: number;
        columns: number;
    };

    tileRows: number;

    listLayout: string;

    selectedItem: any;

    @Input() rows: Array<any>;

    @Input() root: string;

    @Output() emitSelectedItem: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.toggleLayout();
    }

    public itemSelected (event) {
        console.log('this.selectedItem', this.selectedItem);
        this.emitSelectedItem.emit(this.selectedItem);
    }

    public toggleLayout () {
        if (this.tiles && this.tiles.rows === 1 && this.tiles.columns === 3) {
            this.tiles = {
                rows: 4,
                columns: 1
            }
            this.listLayout = 'card';
        } else {
            this.tiles = {
                rows: 1,
                columns: 3
            };
            this.listLayout = 'row';
        }
    }

}
