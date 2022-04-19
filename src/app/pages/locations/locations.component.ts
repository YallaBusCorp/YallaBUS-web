import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Loader} from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit {

  constructor() { }
    map: any;
    map2: any;
   position : any = [{lat: -34.397, lng: 150.644}, {lat: -34.597, lng: 150.544}, {lat: -34.497, lng: 150.444}];
   styles: any = [
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
  ];

  ngOnInit(): void {
    // this.loadScript();
    let loader = new Loader({
      apiKey: environment.MapApiKay,
    });

   loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: this.position[0],
        zoom: 10,
        styles : this.styles,
      });
     this.map2 = new google.maps.Map(document.getElementById("map2") as HTMLElement, {
       center: this.position[0],
       zoom: 10,
       styles : this.styles,
     });
    });
  }
  private loadScript() {
    let chatScript = document.createElement("script");
    chatScript.type = "text/javascript";
    chatScript.async = true;
    chatScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBS_3oAyRG-5knJxCi8k-c2vFUexyLWqvA";
    //&callback=initMap
    document.body.appendChild(chatScript);
  }


}
