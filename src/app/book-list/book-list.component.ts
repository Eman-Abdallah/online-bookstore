import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cartservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] | undefined;
  userId!: string | null;
  constructor(private bookService: BookService ,private router:Router , private authService:UserService
    , private toastr:ToastrService , private cartService :CartService) {
      this.userId =this.authService.getUserId();
     }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  readMore(id: number) {
    this.router.navigate(['bookDetails', id]);
  }
  addToCart(id:number,price:any){
    this.cartService.addToCart(this.userId,id,1,price).subscribe(
      (response) => {
        this.cartService.addItemToCart(response);
      this.toastr.success('Book added to cart');
      
    },
  (err)=>{
    this.toastr.error(err);    
    console.log(err);
    
  });
  }
}
