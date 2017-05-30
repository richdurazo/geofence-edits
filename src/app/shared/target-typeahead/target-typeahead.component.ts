import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TargetApiService } from '../target-api.service';

@Component({
  selector: 'app-target-typeahead',
  templateUrl: './target-typeahead.component.html',
  styleUrls: ['./target-typeahead.component.scss']
})
export class TargetTypeaheadComponent implements OnInit {

    @Input() targets = [];

    @Output() emitSelectedItem: EventEmitter<any> = new EventEmitter();

    options = [];

    filteredResults: any;

    targetCtrl: FormControl;

  constructor(private targetApi: TargetApiService) { }

  ngOnInit() {
      this.fetchTargetOptions();
      this.targetCtrl = new FormControl();
      this.setFilteredResults();
  }

  fetchTargetOptions () {
      this.targetApi.fetchTargets()
      .subscribe(
          data => {
              this.options = data;
          }
      )
  }

  filterStates(val: string) {
    return !!val && val.length ? this.options.filter(s => {
        return s.display_name.toLowerCase().indexOf(val.toLowerCase()) != -1;
    }) : this.options;
  }

  setFilteredResults () {
      this.filteredResults = this.targetCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }

  itemSelected (selectedItem, event) {
      if (event.isUserInput) {
              this.emitSelectedItem.emit(selectedItem);
              this.setFilteredResults();
              this.targetCtrl.setValue(null);
      }
  }

}
