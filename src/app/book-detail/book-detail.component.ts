import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cartservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  isLiked: boolean = false;
  constructor(private route:ActivatedRoute, private bookService:BookService ,
    private router :Router
    , private authService: UserService , private cartService: CartService , private toastr : ToastrService) { 
      this.userId =this.authService.getUserId();
    }
bookDetail!:Book;
userId:any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getBookDetails(id);
      this.checkIfBookIsLiked(id);
    });
  }
getBookDetails(id:number){
  this.bookService.getBookById(id).subscribe((data) => {
this.bookDetail=data;
console.log(this.bookDetail);

  })
}
addToCart(id:number,price:any){
  var price=price;
  this.cartService.addToCart(this.userId,id,1,price).subscribe(
    (response) => {
    this.toastr.success('Book added to cart');
    
  },
(err)=>{
  this.toastr.error(err);  
});
}
addToLiked(id:number){
  this.cartService.addToLiked(this.userId,id).subscribe(
    (response) => {
    this.toastr.success('Book added to liked');
    this.isLiked=true;
  },
(err)=>{
  this.toastr.error(err.error);   
});
}
checkIfBookIsLiked(bookId: number): void {
  this.cartService.isBookLiked(this.userId,bookId).subscribe(
    (isLiked) => {
      this.isLiked = isLiked;
    },
    (error) => {
      console.error('Error checking if book is liked:', error);
    }
  );
}
}
