import { Category } from "../schemas/book.schemas";

export class UpdateBookDto  {
    readonly title: string;   
    readonly author: string;
    readonly description: string;
    readonly price: number;
    readonly category: Category;
}