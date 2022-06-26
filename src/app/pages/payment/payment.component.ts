import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {PaymentService} from "../../servies/Payment/payment.service";
import {PaymentModule} from "../../models/payment/payment.module";
import {MatTableDataSource} from "@angular/material/table";
import {AppointmentInterface} from "../../models/appointment/appointment.module";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  Payments: any;
  theDateNow: any = new Date;
  PaymentModule: PaymentModule | any;
  ShowAddbutton : boolean =true;
  constructor(
    private PaymentApi: PaymentService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getPayments();
  }

  displayedColumns: string[] = ['id', 'stdName',
    'stdPhone', 'paymentStartDate' ,'paymentEndDate'
    , 'paymentPrice', 'paymentMethodType'
  ];
  dataSource: MatTableDataSource<PaymentModule>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  SearchAndPagination(){
    this.dataSource = new MatTableDataSource(this.Payments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getPayments() {
    this.PaymentApi.getPayments()
      .subscribe( (res : any) => {
          this.Payments = res;
          this.SearchAndPagination();

        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));

        }
      )
  }


}
