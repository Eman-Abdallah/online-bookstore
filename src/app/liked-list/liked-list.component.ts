import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cartservice';
import { Book } from '../models/book.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LikedItems } from '../models/likedItems.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liked-list',
  templateUrl: './liked-list.component.html',
  styleUrls: ['./liked-list.component.scss']
})
export class LikedListComponent implements OnInit {
  likedBooks: LikedItems[] = [];
  userId!: string | null;
  constructor(private likedBooksService: CartService , private router:Router , private authService:UserService ,private toastr:ToastrService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.getLikedList();

}
getLikedList(){
  this.likedBooksService.getLikedBooks(this.userId).subscribe(books => {
    this.likedBooks = books;
    this.router.navigate(['../liked-list'])
    
  },
  (error) => {
    console.error('Error fetching cart items:', error);
});
}
removeFromLiked(bookId: number): void {
  this.likedBooksService.removeFromLiked(this.userId,bookId).subscribe(
    () => {
      this.getLikedList();
    },
    (error) => {
      console.error('Error removing from liked books:', error);
    }
  );
}
addToCart(id:number,price:any){
  this.likedBooksService.addToCart(this.userId,id,1,price).subscribe(
    (response) => {
      this.likedBooksService.addItemToCart(response);
    this.toastr.success('Book added to cart');   
  },
(err)=>{
  this.toastr.error(err);  
});
}
}

