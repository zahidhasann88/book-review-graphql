import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';
import Book, { IBook } from '../models/Book';
import Review, { IReview } from '../models/Review';

const resolvers: IResolvers = {
  Query: {
    books: async (): Promise<IBook[]> => {
      try {
        return await Book.find();
      } catch (error) {
        console.error('Error fetching books:', error);
        throw new GraphQLError('Failed to fetch books', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
    book: async (_: any, { id }: { id: string }): Promise<IBook | null> => {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new GraphQLError('Invalid book ID', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
        const book = await Book.findById(id);
        if (!book) {
          throw new GraphQLError('Book not found', {
            extensions: { code: 'NOT_FOUND' },
          });
        }
        return book;
      } catch (error) {
        if (error instanceof GraphQLError) {
          throw error;
        }
        console.error('Error fetching book:', error);
        throw new GraphQLError('Failed to fetch book', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
    reviews: async (): Promise<IReview[]> => {
      try {
        return await Review.find();
      } catch (error) {
        console.error('Error fetching reviews:', error);
        throw new GraphQLError('Failed to fetch reviews', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
  },
  Mutation: {
    addBook: async (_: any, { title, author, publishedYear }: { title: string; author: string; publishedYear?: number }): Promise<IBook> => {
      try {
        const newBook = new Book({ title, author, publishedYear });
        return await newBook.save();
      } catch (error) {
        console.error('Error adding book:', error);
        throw new GraphQLError('Failed to add book', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
    addReview: async (_: any, { bookId, rating, comment }: { bookId: string; rating: number; comment?: string }): Promise<IReview> => {
      try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
          throw new GraphQLError('Invalid book ID', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }

        const book = await Book.findById(bookId);
        if (!book) {
          throw new GraphQLError('Book not found', {
            extensions: { code: 'NOT_FOUND' },
          });
        }

        if (rating < 1 || rating > 5) {
          throw new GraphQLError('Rating must be between 1 and 5', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }

        const newReview = new Review({ bookId, rating, comment });
        return await newReview.save();
      } catch (error) {
        if (error instanceof GraphQLError) {
          throw error;
        }
        console.error('Error adding review:', error);
        throw new GraphQLError('Failed to add review', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
  },
  Book: {
    reviews: async (parent: IBook): Promise<IReview[]> => {
      try {
        return await Review.find({ bookId: parent.id });
      } catch (error) {
        console.error('Error fetching reviews for book:', error);
        throw new GraphQLError('Failed to fetch reviews for book', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
  },
  Review: {
    book: async (parent: IReview): Promise<IBook | null> => {
      try {
        return await Book.findById(parent.bookId);
      } catch (error) {
        console.error('Error fetching book for review:', error);
        throw new GraphQLError('Failed to fetch book for review', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
  },
};

export default resolvers;