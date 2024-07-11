import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { UserService } from './user.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();
  private apiUrl = `${environment.apiUrl}`;
  token = localStorage.getItem("jwt");
  constructor(private http: HttpClient, private authService:UserService ) {}

  addToCart(userId:any,bookId: number, quantity: number = 1, price:number): Observable<any> {
    const token = this.authService.getToken(); 
    return this.http.post(`${this.apiUrl}/api/Cart/add`, { userId,bookId, quantity ,price},{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getCartItems(): Observable<any[]> {
    return this.cartItems$;
  }

  setCartItems(cartItems: any[]): void {
    this.cartItemsSubject.next(cartItems);
  }


  getCart(userId: any): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    
    return this.http.get(`${this.apiUrl}/api/Cart`, {
        headers: headers,
        params: { userId: userId }
    });
}
addItemToCart(item: any): void {
  const currentItems = this.cartItemsSubject.value;
  const updatedItems = [...currentItems, item];
  this.cartItemsSubject.next(updatedItems);
}
  addToLiked(userId:any,bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/LikedBooks/add`, { userId,bookId},{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getLikedBooks(userId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  
  return this.http.get(`${this.apiUrl}/api/LikedBooks`, {
      headers: headers,
      params: { userId: userId }
  });
  }

  updateQuantity(userId: any, bookId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Cart/updateQuantity`, { userId, bookId, quantity });
}

removeItem(userId: any, bookId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Cart/removeItem`, {
        params: { userId: userId, bookId: bookId.toString() }
    });
}
clearCart(userId: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}/api/Cart/clear?userId=${userId}`);
}
removeFromLiked(userId: any, bookId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/LikedBooks/removeItem`, {
        params: { userId: userId, bookId: bookId.toString() }
    });
}

isBookLiked(userId:any,bookId: number): Observable<boolean> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.get<boolean>(`${this.apiUrl}/api/LikedBooks/isLiked`, { headers, params: { bookId: bookId.toString(), userId } });
}
}
