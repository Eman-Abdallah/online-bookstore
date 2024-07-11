import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model'; // Import your models

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = environment.apiUrl; // Your API URL from environment file

  constructor(private http: HttpClient) { }

  // Example API call to fetch books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/api/Books`);
  }

  // Example API call to add a book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/api/books`, book);
  }
  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/Books/categories`);
  }

  getTop3Books(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/api/Books/top3`);
  }
  getBookById(id:number){
    return this.http.get<Book>(`${this.apiUrl}/api/Books/${id}`);
  }
  // Add more API calls as needed (update, delete, etc.)
}
