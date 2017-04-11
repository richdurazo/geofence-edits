import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CampaignsListComponent } from './campaigns-list.component';
import { CampaignApiService } from '../../shared/campaign-api.service';
import { CampaignApiMockService } from '../../../mocks/campaigns/campaign-api-mock.service';

describe('CampaignsListComponent', () => {
  let component: CampaignsListComponent;
  let fixture: ComponentFixture<CampaignsListComponent>;
  let campaignApi: CampaignApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsListComponent ],
      providers: [
          { provide: CampaignApiService, useClass: CampaignApiMockService }
      ],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    campaignApi = TestBed.get(CampaignApiService);
    spyOn(campaignApi, 'getCampaigns').and.returnValue(Observable.of([{foo:'bar'}, {hay: 'guyz'}]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
      it('should have an init function', () => {
          expect(component.ngOnInit).toBeTruthy();
          expect(typeof component.ngOnInit).toEqual('function');
      });

      it('should call getCampaigns', () => {
        spyOn(component, 'getCampaigns');
        component.ngOnInit();
        expect(component.getCampaigns).toHaveBeenCalled();
      });
  });

  describe('getCampaigns', () => {
      it('should have a getCampaigns function', () => {
          expect(component.getCampaigns).toBeTruthy();
          expect(typeof component.getCampaigns).toEqual('function');
      });

      it('should call the CampaignApi and pass the response to processGetSuccess', () => {
          spyOn(component, 'processGetSuccess');
          expect(component.processGetSuccess).not.toHaveBeenCalled();
          component.getCampaigns();
          expect(campaignApi.getCampaigns).toHaveBeenCalled();
          expect(component.processGetSuccess).toHaveBeenCalledWith([{ foo: 'bar' }, { hay: 'guyz' }]);
      });
  });

  describe('processGetSuccess', () => {
      it('should have a processGetSuccess function', () => {
          expect(component.processGetSuccess).toBeTruthy();
          expect(typeof component.processGetSuccess).toEqual('function');
      });

      it('should handle the response from a successful create call', () => {
          component.processGetSuccess({foo: 'bar'});
          expect(component.campaigns).toEqual({foo: 'bar'});
      });
  });

  describe('deleteItem', () => {
      it('should have a deleteItem function', () => {
          expect(component.deleteItem).toBeTruthy();
          expect(typeof component.deleteItem).toEqual('function');
      });

      it('should call the CampaignApi and pass the response to processGetSuccess', () => {
          spyOn(component, 'processDeleteSuccess');
          spyOn(campaignApi, 'deleteCampaign').and.returnValue(Observable.of({}));
          expect(component.processDeleteSuccess).not.toHaveBeenCalled();
          expect(campaignApi.deleteCampaign).not.toHaveBeenCalled();
          component.deleteItem(0);
          expect(campaignApi.deleteCampaign).toHaveBeenCalled();
          expect(component.processDeleteSuccess).toHaveBeenCalledWith({}, 0);
      });
  });

  describe('processDeleteSuccess', () => {
      it('should have a processDeleteSuccess function', () => {
          expect(component.processDeleteSuccess).toBeTruthy();
          expect(typeof component.processDeleteSuccess).toEqual('function');
      });

      it('should handle the response from a successful delete call and remove the item from the array', () => {
          expect(component.campaigns).toEqual([{foo: 'bar'}, {hay: 'guyz'}]);
          component.processDeleteSuccess({foo: 'bar'}, 0);
          expect(component.campaigns).toEqual([{hay: 'guyz'}]);
      });
  });
});
