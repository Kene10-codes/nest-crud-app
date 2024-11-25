import { isValidObjectId, Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schemas';

import { Query  } from 'express-serve-static-core';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: Model<Book>
    ){}

    async findAll(query: Query): Promise<Book[]> {
        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)
         const keyword = query.keyword ? {
         title: {
            $regex: query.keyword,
            $options: "i"
         }
        } : {}
        const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip)
        return books;
    }

    async createBooks(book: Book): Promise<Book>{
        const books = await this.bookModel.create(book)
        return books
    } 

    async getBook(id: string): Promise<Book>{
       const isValid = isValidObjectId(id)
       if(!isValid) {
        throw new BadRequestException("Please enter valid ID")
       }
        const book = await this.bookModel.findById(id)
        if(!book) {
            throw new NotFoundException("Book not found")
        }
        return book
    }

    async updateBook(id: string, book:  Book): Promise<Book> {
      return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })
    }

    async deleteBookById(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id)
    }
}
 