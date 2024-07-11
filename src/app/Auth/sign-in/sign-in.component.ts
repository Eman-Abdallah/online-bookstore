import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import {jwtDecode} from 'jwt-decode';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  invalidLogin: boolean = false;

  constructor(private toastr: ToastrService,
              private router: Router,
              private authService: UserService) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const credentials = form.value;
    console.log(credentials);

    this.authService.login(credentials).subscribe(response => {      
      const token = (<any>response).token;
      console.log(token);
                   // Decode token to get user ID
                   const decodedToken: any = jwtDecode(response.token);
                   const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']; // Adjust based on your token structure
      this.authService.storeToken(token);
      this.authService.storeUserId(userId);
      console.log(userId);
      
      this.invalidLogin = false;
      this.router.navigate(['/']);
      this.toastr.success('Login successful');

      
    }, err => {
      this.invalidLogin = true;
      this.toastr.error('Invalid username or password.');
    });
  }

}
