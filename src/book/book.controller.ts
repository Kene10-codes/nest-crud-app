import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, NotFoundException, Delete, HttpStatus, Req, Res, HttpException, Query} from '@nestjs/common';
import { BookService } from './book.service';
import {  Book } from './schemas/book.schemas';
import { CreateBookDto } from './dto/craeate-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getBookks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.bookService.findAll(query)
    }

    @Post('create')
    async createBook(@Body() book: CreateBookDto): Promise<Book> {
       const res = this.bookService.createBooks(book)
       return res
    }

    @Get(":id")
    async getBook(@Param("id") id: string){
     const book = this.bookService.getBook(id)
     if(!book) {
        throw new NotFoundException("Book not found")
     } 
        return book;
    }

    @Put(':id')
    async updateBook(@Param("id") id: string, @Body() book: UpdateBookDto): Promise<Book> {
        const books = this.bookService.updateBook(id, book)
        return books;
    }

    @Delete(':id')
    async deleteBook(@Param("id") id: string): Promise<Book>{
       const success = this.bookService.deleteBookById(id)
       if(!success) {
        throw new HttpException("Book not deleted", HttpStatus.NOT_FOUND)
       } 
       return 
    }
}
