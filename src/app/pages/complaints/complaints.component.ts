import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import initializeApp = firebase.initializeApp;
import getFirestore  = firebase.firestore;
import getAnalytics  = firebase.analytics;
import {environment} from "../../../environments/environment";

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



export class ComplaintsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

    var docRef = db.collection("company").doc("serkes");
   // console.log(docRef);
    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

}
