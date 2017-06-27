import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DateUtilsService } from '../../shared/date-utils.service';
import { ContentApiService } from '../shared/content-api.service';

import { ContentCreatorFormComponent } from './content-creator-form.component';
import { ContentModel } from '../shared/content.model';


@Component({
  selector: 'app-content-creator',
  templateUrl: './content-creator.component.html',
  styleUrls: ['./content-creator.component.scss']
})
export class ContentCreatorComponent implements OnInit {
    editMode: boolean;
    id: string;
    @ViewChild(ContentCreatorFormComponent)
    public creatorForm: ContentCreatorFormComponent;

  constructor(
      private dateUtils: DateUtilsService,
      private contentApi: ContentApiService,
      private router: Router,
     private route: ActivatedRoute,

  ) { }

  ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = params['id'];
                    this.editMode = params['id'] != null;
            });
      if (this.editMode) {
          this.creatorForm.editMode = true;
          this.initForm();
      }

  }

  public submitForm (event) {
      /*coppied validation pattern from v3 for now*/
    let barcode = this.creatorForm.form.value.redemption_code;

      if (this.creatorForm.form.value.codeOption === 'manual') {
          switch (this.creatorForm.form.value.redemption_format) {
              case 'CODABAR':
              if (barcode.length < 3) {
                  alert('invalid redemption code');
                  return false;
              }
              if (
                  ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D']
                  .indexOf(barcode[0]) === -1 || ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D']
                  .indexOf(barcode[barcode.length - 1]) === -1
                  ) {
                      alert('invald redemption code');
                      return false;
                    }
                    break;
                    case 'EAN_8':
                    if (barcode.length !== 8 || isNaN(barcode)) {
                        alert('invald redemption code');
                        return false;
                    }
                    break;
                    case 'EAN_13':
                    if (barcode.length !== 13 || isNaN(barcode)) {
                        alert('invald redemption code');
                        return false;
                    }
                    break;
                    case 'ITF':
                    case 'RSS_14':
                    if (isNaN(barcode)) {
                        alert('invald redemption code');
                        return false;
                    }
                    break;
                    case 'RSS_EXPANDED':
                    if (barcode.length < 14){
                        alert('invald redemption code');
                        return false;
                    }
                    break;
                    case 'UPC_A':
                    if (barcode.length !== 12 || isNaN(barcode)) {
                        alert('invald redemption code');
                        return false;
                    }
                    break;
                    case 'UPC_E':
                    if (barcode.length !== 6 || isNaN(barcode)) {
                        alert('invald redemption code');
                        return false;
                    }
                    break;
                    case 'CODE_39':
                    case 'CODE_93':
                    case 'CODE_128':
                    case 'QR_CODE':
                    case 'AZTEC':
                    case 'DATA_MATRIX':
                    case 'MAXICODE':
                    case 'PDF_417':
                    case 'UPC_EAN_EXTENSION':
                    if (barcode.length < 1) {
                        alert('invald redemption code');
                        return false;
                    }
                    break;
                    case 'OTHER':
                    break;
                    default:
                    alert('invalid format');
                    return false;
                    }
      }
      if (!this.creatorForm.form.valid) {
          this.creatorForm.form.onSubmit(event);
          return;
      }

        let obj = Object.assign({}, this.creatorForm.content);
        obj.start_at = this.dateUtils.formatSQLDate(obj.start_at);
        obj.end_at = this.dateUtils.formatSQLDate(obj.end_at);

        if (!this.editMode) {
            console.log('submited form', obj);
            this.contentApi.createContent(obj)
            .subscribe(
                data => this.processSuccess(data)
            );
        } else {
            console.log('update form', obj);
           this.contentApi.updateContent(obj)
            .subscribe(
                data => this.processSuccess(data)
            );
       }

  }

  processSuccess (data) {
      this.router.navigate(['content', data.id]);
  }

    public initForm() {
        this.contentApi.getContent(this.id)
        .subscribe(
            (data) => {
                console.log('we are in the content creator form component', data)
                this.creatorForm.content = data;
                this.creatorForm.contentUuid =  data.uuid;
                this.creatorForm.contentType = data.type;
                this.creatorForm.content.redemption_code = data.redemption_method;
                if (this.creatorForm.content.quantity) {
                    this.creatorForm.limitEnabled = true;
                }
                if (this.creatorForm.content.scratcher_name) {
                    this.creatorForm.scratcherEnabled = true;
                    this.creatorForm.content.scratcher_enabled = true;
                    this.creatorForm.setImageConfig();
                    this.creatorForm.heroOfferImageExists = true;
                    this.creatorForm.heroScratcherImageExists = true;
                }
        });
    }
    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

}
