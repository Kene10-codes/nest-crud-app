import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/book.schemas";

export class CreateBookDto  {
    @IsString()
    @IsNotEmpty()
    readonly title: string;   
    @IsString()
    @IsNotEmpty()
    readonly author: string;
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
    @IsNotEmpty()
    @IsEnum(Category, {message: "Please enter a correct category"})
    readonly category: Category;
}