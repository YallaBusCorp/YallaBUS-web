export interface StudentInterface {
  "stdName": string;
  "stdPhone": string;
  "town": {
    "id" : number,
  };
  "university": {
    "id" : number,
  };
  "company":  {
    "id" : number,
  };
  "endSubscriptionDate": Date;
}

export class StudentModule {
  // "id": any = null;
  "code": string;
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
