import {Component, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import initializeApp = firebase.initializeApp;
import getFirestore  = firebase.firestore;
import getAnalytics  = firebase.analytics;
import {environment} from "../../../environments/environment";
import {EmployeeService} from "../../servies/Employee/employee.service";
import {CompanyService} from "../../servies/Company/company.service";
import {ToastrService} from "ngx-toastr";
import {StudentService} from "../../servies/Student/student.service";
import {ComplaintInterface, ComplaintModule} from "../../models/complaint/complaint.module";
import {DatePipe} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Timestamp = firebase.firestore.Timestamp;
import {timestamp} from "rxjs";

let app;
if (!firebase.apps.length) {
  app = initializeApp(environment.firebase);
}else {
  app =  firebase.app(); // if already initialized, use that one
}
const analytisc = getAnalytics(app);
const db = getFirestore(app);

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})



export class ComplaintsComponent implements OnInit,OnDestroy {
  Complaints :any | null = [];
  ComplaintsFinished :any | null = [];
  Company : any;
  constructor(
    private ApiCompany: CompanyService,
  private ApiStudent: StudentService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // db.collection("company").doc("serkes")
    //   .collection("complaint").orderBy("msgTimestamp", "desc")
    //   .onSnapshot({
    //     includeMetadataChanges: true
    //   }, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.data());
    //     });
    //   });

    // send
    // let washingtonRef =db.collection("company").doc("serkes")
    //    .collection("complaint").doc("kjvLnGnN2S5eGyusVWVN");
    // washingtonRef.update({
    //   message : "Yasser"
    // })
    //   .then(() => {
    //     console.log("Document successfully updated!");
    //   })
    //   .catch((error) => {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    //   });

    // Add company

   // db.collection("company").doc('unibus').set({
   //      "id" : 1
   //  });
  this.getCompanyAndComplaints();
 // console.log(this.Company.companyName);

 // this.getComplaints();
  }
  public ngOnDestroy() {

    this.washingtonRef.unsubscribe();
  }
  fb :any;
  getComplaints() {

   this.fb = db.collection("company").doc(this.Company.companyName)
      .collection("complaint").orderBy("msgTimestamp", "desc")
      .onSnapshot({
        includeMetadataChanges: true
      }, (querySnapshot) => {
        this.ComplaintsFinished= [];
        this.Complaints= [];
        querySnapshot.forEach((doc) => {
          if(doc.data()['response'] != null && doc.data()['response'])
           this.ComplaintsFinished.push(doc.data());
          else
            this.Complaints.push(doc.data());
        });
        this.fb.unsubscribe();
        console.log(this.ComplaintsFinished);
        console.log(this.Complaints);

      });
  }
  getCompanyAndComplaints() {
    this.ApiCompany.getcompanyById(environment.Token)
      .subscribe( (res : any) => {
          this.Company = res;
          this.getComplaints();
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }

  getCompany() {
    this.ApiCompany.getcompanyById(environment.Token)
      .subscribe( (res : any) => {
          this.Company = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }
   washingtonRef : any;
  SendReplyComplaint(data : any) {
    this.washingtonRef =db.collection("company").doc(this.Company.companyName)
      .collection("complaint").doc(data.complaintID);
    this.washingtonRef.update({
      response : data.response,
     // resTimestamp : data.resTimestamp,
    })
      .then(() => {
        this.toastr.success('Added Successfully');
        let ref = document.getElementById('close-button');
        ref?.click();
      })
      .catch((error :any) => {
        this.toastr.error("Error updating document:", error);
      });

  }

    getStudent(UID :any) {
    this.ApiStudent.getStudentByUID(UID)
      .subscribe( (res : any) => {
          this.ComplaintInterface.user = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }

  Date(number: number) {
    return new Date(number * 1000).toLocaleDateString("en-us");
  }
  ComplaintInterface : ComplaintInterface | null;
  onEdit(row: any){
    this.ComplaintInterface = new ComplaintInterface;
    this.ComplaintInterface.complaintID = row.complaintID;
    this.ComplaintInterface.message = row.message;
    this.ComplaintInterface.response = row.response;
    this.getStudent(row.userID);
    console.log(this.ComplaintInterface);

  }
  formValues = new FormGroup({
    response: new FormControl('', [Validators.required]),
  });
  get response(): any {
    return this.formValues.get('response');
  }
  //Start Get All Details
  getDetails() {
    let pipe = new DatePipe('en-US');
    this.ComplaintInterface.response = this.response?.value;
   // this.ComplaintInterface.resTimestamp =  new Timestamp(Date.now(), 0);
  }
  //End Get All Details

  //Start Save Bus
  SaveComplaint() {
    this.getDetails();
    console.log(this.ComplaintInterface);

    if (this.formValues.status == "VALID") {
        this.SendReplyComplaint(this.ComplaintInterface);

    } else {
      this.toastr.info('Please fill in the data correctly');
    }

  }
  //End Save Bus

}
