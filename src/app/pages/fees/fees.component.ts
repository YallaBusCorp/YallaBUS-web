import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../servies/Employee/employee.service";
import {FeesService} from "../../servies/fees/fees.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit , AfterViewInit{
  filterFees : any = "Pending";
  PendingFees : any;
  ApprovedFees : any;
  AllFees : any;
  constructor(
    private api: FeesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getPendingfees();

  }
  ngAfterViewInit(){
    this.getApprovedfees();
    this.getAllfees();
  }

  private getPendingfees() {
    this.api.getPendingfees()
      .subscribe( (res : any) => {
          this.PendingFees = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }
  private getApprovedfees() {
    this.api.getApprovedfees()
      .subscribe( (res : any) => {
          this.ApprovedFees = res;

        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }
  private getAllfees() {
    this.api.getAllfees()
      .subscribe( (res : any) => {
          this.AllFees = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }
  ApprovedFee(id : any) {
    this.api.ApprovedFee(id)
      .subscribe(() =>{
          this.toastr.success('Approved Successfully');
        this.getPendingfees();
        this.getApprovedfees();
        },
        (err : any)=>{
          this.toastr.warning(err.statusText);
        }
      )
  }
}
