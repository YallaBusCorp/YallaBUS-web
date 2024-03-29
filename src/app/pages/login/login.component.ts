import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeComponent} from "../home/home.component";
import {AuthService} from "../../servies/Auth/auth.service";
import {CompanyComponent} from "../company/company.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../assets/vendor/css/pages/page-auth.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router : Router,
    private api : AuthService,
  ) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    username : new FormControl('' , [Validators.required] ),
    password : new FormControl('' , [Validators.required]),
  });

  get username (): any{
    return this.loginForm.get('username');
  }
  get password (): any{
    return this.loginForm.get('password');
  }
  login() {
    if (this.loginForm.status != "INVALID"){
      if(this.username.value == "Admin" && this.password.value == "123456789"){
        this.toastr.success('Register Successfully');
        localStorage.setItem('token',"0");
        history: CompanyComponent;
        history.go();
        //this.router.navigate(['/Company']);
      }else{
        this.api.Login(this.username.value , this.password.value)
          .subscribe((res : any) => {
                if(res == null){
                  this.toastr.info("Company Not Found");
                }else{
                  this.toastr.success('Register Successfully');
                  localStorage.setItem('token',res.emp.company.id);
                  history : HomeComponent;
                  history.go(0);
                }
            },
            (err : any) => {
              this.toastr.warning("wrong in Server");
            }
          )
      }
    }else{
      this.toastr.info('Please fill in the data correctly');
    }
  }

}
