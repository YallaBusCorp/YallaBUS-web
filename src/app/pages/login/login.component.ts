import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../assets/vendor/css/pages/page-auth.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router : Router
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
  //  console.log(this.loginForm);
    // this.http.post<any>()
    if (this.loginForm.status != "INVALID"){
    //  this.authApi.LoginUser()
       // .subscribe(res => {
       //      const  user = res.find((a:any) => {
       //        return a.email == this.loginForm.value.email && a.password == this.loginForm.value.password
       //      });
            if(this.username.value == "unibus" && this.password.value == "123456789"){
              this.toastr.success('Register Successfully');
              // this.loginForm.reset();
              localStorage.setItem('token','1');
               history : HomeComponent;
               history.go(0);
             // this.router.navigate(['/home']);
            }else if(this.username.value == "Sarkees" && this.password.value == "123456789"){
              this.toastr.success('Register Successfully');
              // this.loginForm.reset();
              localStorage.setItem('token','2');
              history : HomeComponent;
              history.go(0);
            //  this.router.navigate(['/home']);
            }else{
              this.toastr.info("Company's Email Not Found");
            }

          // },
          // res => {
          //   this.toastr.info('Please fill in the data correctly');
          // }
   //     );
    }else{
      this.toastr.info('Please fill in the data correctly');
    }
  }

}
