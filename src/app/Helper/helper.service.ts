import { Injectable } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  searshItem(arr : any , id : any){
    let data  ;

    arr.forEach((item : any) =>{
      if(item.id == id){
        data = item;
      }
    });
    return data;
  }
  findIndex(arr : any , id : any) {
    let index = arr.findIndex( (x:any) => x.id == id);
    return  index;
  }

}
