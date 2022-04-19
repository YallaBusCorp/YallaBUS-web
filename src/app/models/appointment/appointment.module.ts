export class AppointmentModule {
  "id" : any | null;
  "appointmentStartTime": String;
  "appointmentType": string;
  "isActive" : boolean;
  "company": company;
}
export interface AppointmentInterface {
  "id" : any | null;
  "appointmentStartTime": String;
  "appointmentType": string;
  "isActive" : boolean;
  "company": company;
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
