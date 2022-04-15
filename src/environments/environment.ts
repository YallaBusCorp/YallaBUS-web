// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {HttpHeaders} from "@angular/common/http";
import * as firebase from "firebase";
export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyDQRBFYWIgLdrjZSd5ffKQ6CM0iuVr6cyo",
    authDomain: "yallabus-eb5a0.firebaseapp.com",
    projectId: "yallabus-eb5a0",
    storageBucket: "yallabus-eb5a0.appspot.com",
    messagingSenderId: "403200399686",
    appId: "1:403200399686:web:ca1beba529afe23baded47",
    measurementId: "G-N7F1D1KVV5"
  },
  UrlWebsite:'https://yalla-bus.herokuapp.com/api/v1',
  httpOptions : {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  },
  Token : localStorage.getItem('token'),
};
firebase.initializeApp(environment.firebase);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
