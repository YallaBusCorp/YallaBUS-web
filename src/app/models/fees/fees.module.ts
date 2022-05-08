import {BusModule} from "../bus/bus.module";

export class FeesModule {
  "id" : any | null;
  "price": string;
  "image": string | null;
  "fessDate": Date | null;
  "bus": BusModule;
  "isApproved" : boolean;
  "feesLk" : feesLk;
}
export interface feesLk{
  "id" : any | null;
  "lkNameAr": string;
  "lkNameEn": string;
}
