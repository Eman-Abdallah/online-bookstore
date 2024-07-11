import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CartService } from '../services/cartservice';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topBooks:Book[] | undefined;
  userId!: string | null;
  constructor(private router:Router , private authService:UserService, private bookService:BookService , private cartService:CartService , private toastr:ToastrService) {
    this.userId = this.authService.getUserId();
   }
  categories:string[] | undefined;
  categoriesList=[
    {name:"Adventure",img:"assets/images/categories/adventure.jpg"},
    {name:"Classic",img:"assets/images/categories/classic1.jpeg"},
    {name:"Crime",img:"assets/images/categories/crime.jpeg"},
    {name:"First Edition",img:"assets/images/categories/firestaddition.jpeg"},
    {name:"Modern Times",img:"assets/images/categories/moderen.jpeg"},
    {name:"Romance",img:"assets/images/categories/romance.jpg"},
    { name:"Suspense",img:"assets/images/categories/suspense.png"}
  ]
  ngOnInit(): void {
    this.getCategories();
    this.getTop3();
  }
  exploreBooks(){
    this.router.navigate(['/books']);
  }
  getCategories(){
    this.bookService.getGenres().subscribe(
      (data) => {
        this.categories = data;
         console.log(this.categories);
        
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  getTop3(){
    this.bookService.getTop3Books().subscribe(data => {
      this.topBooks = data;
    });
  }
  readMore(id: number) {
    this.router.navigate(['bookDetails', id]);
  }
  addToCart(id:number,price:any){
    var price=price;
    this.cartService.addToCart(this.userId,id,1,price).subscribe(
      (response) => {
        this.cartService.addItemToCart(response);
      this.toastr.success('Book added to cart');
      
    },
  (err)=>{
    if(err.error.status==400){
      this.toastr.error('You must sign in first');
      this.router.navigate(['/sign-in']);
    }   
  });
  }
}
