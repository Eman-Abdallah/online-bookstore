import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { CartService } from '../services/cartservice';
import { UserService } from '../services/user.service';
import { CartItems } from '../models/cartItems.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isLiked: boolean = false;
  cartItems: CartItems[] = [];
  totalPrice:number | undefined;
  userId!: string | null;
  constructor(private cartService: CartService, private authService:UserService , private toastr:ToastrService ) {
    this.userId=this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loadCart();

  }
  loadCart() {
    this.cartService.getCart(this.userId).subscribe(
        (cartItems) => {
            this.cartItems = cartItems;
            this.cartService.setCartItems(cartItems); 
            this.calculateTotalPrice();    
            this.cartItems.forEach(item => {
              this.checkIfLiked(item);
            });  
        },
        (error) => {
            console.error('Error fetching cart items:', error);
        }
    );
   
}
calculateTotalPrice() {
  this.totalPrice = Math.round(this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
}
updateQuantity(bookId: number, quantity: number) {
  this.cartService.updateQuantity(this.userId, bookId, quantity).subscribe(
      (cartItem) => {
          this.loadCart(); // Refresh the cart items
      },
      (error) => {
          console.error('Error updating quantity:', error);
      }
  );
}

removeItem(bookId: number) {
  this.cartService.removeItem(this.userId, bookId).subscribe(
      () => {
          this.loadCart(); // Refresh the cart items
          this.toastr.success('Book removed from the  cart');
      },
      (error) => {
          console.error('Error removing item:', error);
      }
  );
}
addToLiked(id:number){
  this.cartService.addToLiked(this.userId,id).subscribe(
    (response) => {
    this.toastr.success('Book added to liked');
    this.loadCart();
  },
(err)=>{
  this.toastr.error(err.error);   
});
}
checkIfLiked(item: any): void {
  this.cartService.isBookLiked(this.userId, item.bookId).subscribe((liked: boolean) => {
    item.isLiked = liked;
  });
};
checkout(){
  
}
}

