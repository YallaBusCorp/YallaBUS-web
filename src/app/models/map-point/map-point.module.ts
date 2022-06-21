import {CompanyModule} from "../company/company.module";

export class MapPointModule {
  "id" : any | null;
  "mapPointTitleAr": string;
  "mapPointTitleEn": string;
  "mapPointType": string;
  "longitude": string;
  "latitude": string;
  "isActive" : boolean;
  "company": CompanyModule;
}
export interface MapPointInterface {
  "id" : any | null;
  "mapPointTitle": string;
  "mapPointType": string;
  "longitude": string;
  "latitude": string;
  "isActive" : boolean;
  "company": CompanyModule;
}

