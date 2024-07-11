import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: UserService
  ) {} // Inject the AuthService

  inValidMes = false;
  errorMessage: string = '';
  userErrorMessage: string = '';

  ngOnInit(): void {}

  public login(form: NgForm) {
    const credentials = form.value;
    console.log(credentials);

    this.authService.register(credentials).subscribe(
      (response) => {
        this.toastr.success('Register In successfully');
        this.router.navigate(['/sign-in']);
        console.log(response);
      },
      (err) => {
        if (err.status === 400 && err.error && err.error.errors) {
          const emailErrors = err.error.errors.Email;

          if (emailErrors && emailErrors.length > 0) {
            this.errorMessage = emailErrors[0];
          }
        } else if (err.status === 500 && err.error) {
          const userErrors = err.error.message;
          if (userErrors && userErrors.length > 0) {
            this.userErrorMessage = userErrors;
          }
        } else {
          this.toastr.error('An error occurred. Please try again later.');
        }
      }
    );
  }
}
