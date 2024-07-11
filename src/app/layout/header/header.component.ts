import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartItems } from 'src/app/models/cartItems.model';
import { CartService } from 'src/app/services/cartservice';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItems: CartItems[] = [];
  totalPrice:number | undefined;
  userId!: string | null;
  constructor(private jwtHelper: JwtHelperService, private router: Router, private authService:UserService,private cartService:CartService) {
    this.userId=this.authService.getUserId();
   }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log(this,cartItems.length);     
    });

  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  public logOut = () => {
    this.authService.logout();
    this.router.navigate(["/"])
  }
}
