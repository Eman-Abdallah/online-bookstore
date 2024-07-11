import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cartservice';
import { CartItems } from '../models/cartItems.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/Order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItems[] = [];
  totalPrice:number | undefined;
  userId!: string | null;
  constructor( private cartService:CartService , private authService:UserService , private router:Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private toastr:ToastrService
  ) {
    this.userId=this.authService.getUserId();
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvv: ['', Validators.required]
      });
   }

  ngOnInit(): void {
    this.loadCart();

  }
  loadCart() {
    this.cartService.getCart(this.userId).subscribe(
        (cartItems) => {
            this.cartItems = cartItems;  
        },
        (error) => {
            console.error('Error fetching cart items:', error);
        }
    );
   
}
goBook(id:number){
  this.router.navigate(['bookDetails', id]);
}
getTotal(): number {
  return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

onSubmit(): void {
  if (this.checkoutForm.valid) {
    const order = {
      userId: this.userId,
      ...this.checkoutForm.value,
      totalAmount: this.getTotal(),
      orderItems: this.cartItems.map(item => ({
        bookId: item.bookId,
        book: item.book,
        quantity: item.quantity,
        price: item.price
      }))
    };
    console.log(order);
    
    this.orderService.createOrder(order).subscribe(
      (response) => {
        this.toastr.success('Order Submitted successfully')
        // Clear the cart after the order is created
        this.cartService.clearCart(this.userId).subscribe(
          () => {
            console.log('Cart cleared successfully');
            this.cartItems = []; // Clear the cart items in the frontend
          },
          error => {
            console.error('Error clearing cart:', error);
          }
        );
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.toastr.error('Error creating order:', error)
      }
    );
  }
}
}
