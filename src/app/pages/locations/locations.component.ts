import { Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Loader} from "@googlemaps/js-api-loader";
import {MapPointService} from "../../servies/mapPoint/map-point.service";
import {ToastrService} from "ngx-toastr";
import {MapPointModule} from "../../models/map-point/map-point.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit   {
  markers : any = [];
  markerMap : any = [];
  map: any;
  mapAll: any;
  loader:any;
  icon:any;
  markerPoint : any;
  MapPointModule : MapPointModule | any;
  ShowAddbutton : boolean =true;
  constructor(
    private api : MapPointService ,
    private toastr: ToastrService
  ) {
    this.getMapPoints();
    this.loader = new Loader({
      apiKey: environment.MapApiKay,
    });

  }
  ngOnInit(): void {
    console.log(this.markers);
    this.loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center:
          new google.maps.LatLng(31.265681001787627,30.809710233977192) ,
        zoom: 9,
        styles : environment.Mapstyles,
      });
      this.mapAll = new google.maps.Map(document.getElementById("mapAll") as HTMLElement, {
        center:
          //new google.maps.LatLng(this.markers[0].latitude,this.markers[0].longitude)  ,
           new google.maps.LatLng(31.265681001787627,30.809710233977192) ,
        zoom: 9,
        styles : environment.Mapstyles,

      });

      this.icon = {
        url: "../assets/img/icons/Icons/bus-station-colored.svg",
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0), // anchor
        // color : "#EB671A",
        fillColor: "#EB671A",
        strokeColor :"#EB671A",
        fillOpacity: 1,
        strokeWeight: 1,
        scale: 0.075,
      };
       google.maps.event.addListener(this.map , "click", (event : any) => {
         if(this.markerPoint !=null){
           this.markerMap[0].setMap(null);
         }
        this.markerMap[0] = this.addMarker(event.latLng, this.map);
          this.markerPoint = JSON.parse( JSON.stringify(this.markerMap[0].position.toJSON(), null, 2));
      console.log(this.markerPoint);

      });

    });
  }
  // Adds a marker to the map.

  public addMarker(location : any, map : any) {
     return new google.maps.Marker({
       position: location,
       map: map,
       icon: this.icon,
     });

  }

  getMapPoints() {
     this.api.getMapPoints()
      .subscribe( (res : any) => {
          this.markers = res;
          this.loader.load().then(() => {
            res.forEach( (location : any) => {
              new google.maps.Marker({
                position: new google.maps.LatLng(location.latitude, location.longitude),
                map: this.mapAll,
                icon: this.icon,
                title: location.mapPointTitleAr,
              });
            });
          });

        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      );
  }


  formValues = new FormGroup({
    mapPointTitleAr: new FormControl('', [Validators.required]),
    mapPointType: new FormControl('', [Validators.required]),
    isActive : new FormControl(''),
  });
  get mapPointTitleAr(): any {
    return this.formValues.get('mapPointTitleAr');
  }

  get mapPointType(): any {
    return this.formValues.get('mapPointType');
  }

  get isActive(): any {
    return this.formValues.get('isActive');
  }


  validation(arr: MapPointModule) {

    if (this.formValues.status == "VALID" && this.markerPoint != null) {
      return true;
    }
    return false;
  }
  //Start Get All Details
  getDetails() {

    this.MapPointModule.id = this.MapPointModule.id ? this.MapPointModule.id :null;
    this.MapPointModule.mapPointTitleAr =  this.MapPointModule.mapPointTitleAr !=null ?
      this.MapPointModule.mapPointTitleAr : this.mapPointTitleAr.value;
    this.MapPointModule.longitude = this.markerPoint !=null ? this.markerPoint.lng : null;
    this.MapPointModule.latitude = this.markerPoint !=null ? this.markerPoint.lat : null;

    this.MapPointModule.mapPointType = this.mapPointType?.value;
    this.MapPointModule.isActive = (this.ShowAddbutton == true) ? true :
      (this.isActive?.value != null && this.isActive?.value != false ) ? true : false;
    this.MapPointModule.company = { "id" :  environment.Token };
  }
  //End Get All Details
  DeleteMarker(id : any) {
    this.api.DeleteMapPoint(id)
      .subscribe((res:any) =>{
          this.toastr.success('Delete Successfully');
          this.getMapPoints();
        },
        (err : any)=>{
          this.toastr.warning(err.statusText);
        }
      )
  }

  public isActiveButton :boolean = true;
  onEdit(row: any) {
    this.ShowAddbutton = false;
    this.MapPointModule = new MapPointModule;
    this.MapPointModule.id = Number(row.id);
    this.formValues.controls['mapPointTitleAr'].setValue(row.mapPointTitleAr);
    this.formValues.controls['mapPointType'].setValue(row.mapPointType);
    this.formValues.controls['isActive'].setValue(row.isActive);
    this.isActiveButton =row.isActive;
    if(this.markerMap[0] !=null){
      this.markerMap[0].setMap(null);
    }
    this.markerMap[0] = this.addMarker(new google.maps.LatLng(row.latitude,row.longitude),
      this.map);
    this.markerPoint =null;


  }

  AddButton() {
    this.ShowAddbutton = true;
    this.formValues.reset();
    if(this.markerMap[0] !=null){
      this.markerMap[0].setMap(null);
    }
    this.markerPoint =null;

  }

  SavePoint() {
    this.MapPointModule = new MapPointModule;
    this.getDetails();
    console.log(this.MapPointModule);
    if (this.validation(this.MapPointModule)) {
      this.api.PostMapPoint(this.MapPointModule)
        .subscribe((res : any) => {
            this.toastr.success('Added Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getMapPoints();
          },
          (err : any) => {
            console.log(err);
            this.toastr.warning(err.error ? err.error : "wrong in Server");
          }
        )
    } else {
      this.toastr.info('Please fill in the data correctly');
    }
  }

  UpdatePoint() {
    this.getDetails();
    if (this.validation(this.MapPointModule)) {
      this.api.UpdateMapPoint(this.MapPointModule)
        .subscribe((res:any) => {
            this.toastr.success('Updated Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getMapPoints();
          },
          (err:any) => {
            this.toastr.warning(err.error ? err.error : "wrong in Server");
          }
        )
    } else {
      this.toastr.info('Please fill in the data correctly');
    }

  }
}
