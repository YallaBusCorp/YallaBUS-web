import { Component, OnInit } from '@angular/core';
import {FeesService} from "../../../servies/fees/fees.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fee-by-bus',
  templateUrl: './fee-by-bus.component.html',
  styleUrls: ['./fee-by-bus.component.css']
})
export class FeeByBusComponent implements OnInit {
  AllFees : any;
  constructor(
    private api: FeesService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  id : any = 1;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    console.log(this.id);
    this.getAllfeesByBus(this.id);
  }
  private getAllfeesByBus(id : any) {
    this.api.getAllfeesByBus(id)
      .subscribe( (res : any) => {
          this.AllFees = res;
        },
        (err : any) => {
          this.toastr.warning((err.statusText ?err.statusText : (err.error ? err.error : "Internal Server Error")));
        }
      )
  }

}
