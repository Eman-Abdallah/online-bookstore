import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/Order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

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

}
