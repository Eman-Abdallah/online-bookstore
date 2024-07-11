import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/Order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  orders: any[] = [];
  userId: string | null;

  constructor(private orderService: OrderService, private authService:UserService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders(this.userId).subscribe(
      (orders) => {
        this.orders = orders;
        console.log(orders);
        
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

}
