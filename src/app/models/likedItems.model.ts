import { Book } from "./book.model";
import { User } from "./user.model";


export interface LikedItems {
    id: number;       // Unique identifier for the book
    bookId: number;       // Unique identifier for the book    // Unique identifier for the book
    userId: string;    // Title of the book
    book:Book;
    user:User
}