// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {HttpHeaders} from "@angular/common/http";
// import * as firebase from "firebase";
export const environment = {
  production: true,
  firebase : {
    apiKey: "AIzaSyDQRBFYWIgLdrjZSd5ffKQ6CM0iuVr6cyo",
    authDomain: "yallabus-eb5a0.firebaseapp.com",
    projectId: "yallabus-eb5a0",
    storageBucket: "yallabus-eb5a0.appspot.com",
    messagingSenderId: "403200399686",
    appId: "1:403200399686:web:ca1beba529afe23baded47",
    measurementId: "G-N7F1D1KVV5"
  },
  //UrlWebsite:'http://localhost:9000/api/v1',
  UrlWebsite:'https://yalla-bus.herokuapp.com/api/v1',
  //UrlWebsite:'https://yallabus.live/api/v1',
  httpOptions : {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  },
  Token : localStorage.getItem('token'),
  // MapApiKay : 'AIzaSyBFjNIXpDszS-KIK_jstYtMgCoNc4Gfneg',
  MapApiKay : 'AIzaSyBS_3oAyRG-5knJxCi8k-c2vFUexyLWqvA',
  Mapstyles:   [
    {elementType: "geometry", stylers: [{color: "#242f3e"}]},
    {elementType: "labels.text.stroke", stylers: [{color: "#242f3e"}]},
    {elementType: "labels.text.fill", stylers: [{color: "#746855"}]},
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{color: "#d59563"}],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{color: "#d59563"}],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{color: "#263c3f"}],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{color: "#6b9a76"}],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{color: "#38414e"}],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{color: "#212a37"}],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{color: "#9ca5b3"}],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{color: "#746855"}],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{color: "#1f2835"}],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{color: "#f3d19c"}],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{color: "#2f3948"}],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{color: "#d59563"}],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{color: "#17263c"}],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{color: "#515c6d"}],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{color: "#17263c"}],
    },
  ],
};


