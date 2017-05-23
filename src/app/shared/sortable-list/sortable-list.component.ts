import { Component, OnInit, Input } from '@angular/core';

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

    constructor() { }

    ngOnInit() {
        this.toggleLayout();
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
