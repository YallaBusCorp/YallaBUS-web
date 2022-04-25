import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UniversityModule} from "../../models/University/University.module";
import {TownModule} from "../../models/town/town.module";
import {TownService} from "../../servies/Towns/town.service";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UniversityService} from "../../servies/Universities/university.service";

@Component({
  selector: 'app-Supports',
  templateUrl: './supports.component.html',
  styleUrls: ['./supports.component.css']
})
export class SupportsComponent implements OnInit {

  Universities: any;
  Towns: any;
  theDateNow: any = new Date;
  UniversityModule: UniversityModule | any;
  TownModule: TownModule | any;
  ShowAddbutton : boolean =true;
  constructor(
    private UniversityApi: UniversityService,
    private TownApi: TownService,
    private toastr: ToastrService,
  ) {
  }
  ngOnInit(): void {
    this.getUniversities();
    this.getTowns();

  }

  getUniversities() {
    this.UniversityApi.getAllUniversities(Number(environment.Token))
      .subscribe( (res : any) => {
          this.Universities = res;
        },
        (err : any) => {
          console.log(err);
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }

  getTowns() {
    this.TownApi.getAllTowns(Number(environment.Token))
      .subscribe( (res : any) => {
          this.Towns = res;
        },
        (err : any) => {
          console.log(err.error);
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }
  Town_Uni = 1;
  AddButtonUNi(){
    this.ShowAddbutton = true;
    this.formValues.reset();
    this.Town_Uni = 1;
  }
  AddButtonTown(){
    this.ShowAddbutton = true;
    this.formValues.reset();
    this.Town_Uni = 2;
  }
  formValues = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    isActive : new FormControl(''),
  });

  get Name(): any {
    return this.formValues.get('Name');
  }
  get isActive(): any {
    return this.formValues.get('isActive');
  }

  validation() {

    if (this.formValues.status == "VALID") {
      return true;
    }
    return false;
  }

  //Start Get All University Details
  getUniversityDetails() {
    this.UniversityModule.id = this.UniversityModule.id ? this.UniversityModule.id :null;
    this.UniversityModule.universityName =  this.UniversityModule.universityName ?
      this.UniversityModule.universityName : this.Name.value;
    this.UniversityModule.company = { "id" :  environment.Token };
    this.UniversityModule.isActive = (this.ShowAddbutton == true) ? true :
      (this.isActive?.value != null && this.isActive?.value != false ) ? true : false;
  }
  //End Get All University Details


  //Start Get All Town Details
  getTownDetails() {
    this.TownModule.id = this.TownModule.id ? this.TownModule.id :null;
    this.TownModule.townName =  this.TownModule.townName ?
      this.TownModule.townName : this.Name.value;
    this.TownModule.company = { "id" :  environment.Token };
    this.TownModule.isActive = (this.ShowAddbutton == true) ? true :
      (this.isActive?.value != null && this.isActive?.value != false ) ? true : false;
  }
  //End Get All Town Details


  //Start Save Appointment
  Save() {

    if( this.Town_Uni == 1){
        this.SaveUniversity();
      console.log(this.UniversityModule);
    }else{
        this.SaveTwon();
      console.log(this.TownModule);

    }

  }
  SaveUniversity(){
    this.UniversityModule = new UniversityModule;
    this.getUniversityDetails();
    if (this.validation()) {
      this.UniversityApi.PostUniversity(this.UniversityModule)
        .subscribe((res : any) => {
            this.toastr.success('Added Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getUniversities();
          },
          (err : any) => {
            this.toastr.warning(err.error ? err.error : "wrong in Server");
          }
        )
    } else {
      this.toastr.info('Please fill in the data correctly');
    }
  }
  SaveTwon(){
    this.TownModule = new TownModule;
    this.getTownDetails();
    if (this.validation()) {
      this.TownApi.PostTown(this.TownModule)
        .subscribe((res : any) => {
            this.toastr.success('Added Successfully');
            let ref = document.getElementById('close-button');
            ref?.click();
            this.getTowns();
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

  //End Save Appointment
  Update() {

  }
}
