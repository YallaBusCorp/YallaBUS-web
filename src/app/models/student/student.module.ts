export interface StudentInterface {
  "id" : any | null;
  "stdName": string;
  "stdPhone": string;
  "town": {
    "id" : number,
    "townName" : string
  };
  "university": {
    "id" : number,
    "universityName" : string
  };
  "company":  {
    "id" : number,
    "name" : string
  };
  "endSubscriptionDate": Date | null;
  "isSubscribed" : boolean,
   "isActive" : boolean
}

export class StudentModule {
   "id": any = null;
  "stdUid": string;
  "stdName": string;
  "stdPhone": string;
  "town": Town;
  "university":university;
  "company": company;
  "endSubscriptionDate": Date;
  "isSubscribed": boolean;
}
export interface StudentModuleDto {
  page: number;
  results: StudentModule[];
  total_results: number;
  total_pages: number;
}
export interface Town {
  "id": number,
  "townName": string,
}
export interface university {
  "id": number,
  "universityName": string,
}

export interface company {
    "id": number,
    "companyName": string,
    "companyPhone": string,
    "description": string,
    "companyLocation": string,
    "imgURL": string,
    "facebookURL": string
}
export class SubscriptionRenew {
  "std": stdRenew;

}
export interface stdRenew {
  "id": number | null,
  "endSubscriptionDate": Date | string,
  "isSubscribed" : true,
  "isActive" : true
}
