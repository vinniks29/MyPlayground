/* eslint-disable no-console */
import { LightningElement,wire,track } from 'lwc';
import getPermissionSets from '@salesforce/apex/GetSFDCData.getPermissionSets';
import getPermissionSetsAsMap from '@salesforce/apex/GetSFDCData.getPermissionSetsAsMap';

export default class ShowPermissionSets extends LightningElement {

    @track permsets;
    @track permsOptions = [];
    @track selectedValue="";
    @track error;
    @track permsOptionsFromMap = [];

    @wire(getPermissionSets)
    permissionSets({error,data}){
        
        if(data){
            console.log('data==> ' + data);
            if(Array.isArray(data)){
                console.log('an array');
                this.permsets = data;
                Object.keys(data).forEach(key=>{
                    console.log(data[key].Id);
                    this.permsOptions[key] = { label: data[key].Label, value: data[key].Id };
                 });
                console.log('length==> ' + this.permsOptions.length);
            }else{
                console.log('not an array');
            }
        }else{
            console.log(error);
            this.error = error;
        }
    }

    @wire(getPermissionSetsAsMap)
    permissionSetsAsMap({error,data}){
        
        if(data){
            console.log('dataMap==> ' + data);
            console.log(`typeof== ${typeof data}`);
            //if(Array.isArray(data)){
                console.log('an Map array');
                //this.permsets = data;
                Object.keys(data).forEach(key=>{
                    console.log(data[key].Id);
                    this.permsOptionsFromMap[key] = { label: data[key].Label, value: data[key].Id };
                 });
                console.log(`length from Map==> ${this.permsOptions.length}`);
           // }else{
                console.log('not an array');
            //}
        }else{
            console.log(error);
            this.error = error;
        }
    }

    handleChange(event){
        console.log('selected value===> ' + event.detail.value)
        this.selectedValue = event.detail.value;

    }

}