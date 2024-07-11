import { Book } from "./book.model";
import { User } from "./user.model";


export interface CartItems {
    id: number;       // Unique identifier for the book
    bookId: number;       // Unique identifier for the book
    quantity: number;       // Unique identifier for the book
    userId: string;    // Title of the book
    title: string;    // Title of the book
    author: string;   // Author of the book
    price: number;    // Price of the book
    book:Book;
    user:User;
    isLiked:boolean;
}