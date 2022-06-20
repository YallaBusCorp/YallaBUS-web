import {CompanyModule} from "../company/company.module";
import {StudentModule} from "../student/student.module";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export class ComplaintModule {
  "complaintID" : any | null;
  "message": string;
  "rideID": string | null;
  "userID": string | null;
  "response": string | null;
  "msgTimestamp": Timestamp | null;
  "resTimestamp": Timestamp | null;
}
export class ComplaintInterface {
  "complaintID" : any | null;
  "message": string;
  "rideID": string | null;
  "userID": string | null;
  "response": string | null;
  "msgTimestamp": Timestamp | null;
  "resTimestamp": Timestamp | null;
  "user" : StudentModule | null;
}
export interface empLkInterface {
  "id": number,
  "lkName": string,

}
