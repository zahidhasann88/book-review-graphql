import mongoose from 'mongoose';
import Book from '../models/Book';
import Review from '../models/Review';
import connectDB from './db';

const seedDatabase = async () => {
  await connectDB();

  // Clear existing data
  await Book.deleteMany({});
  await Review.deleteMany({});

  // Add sample books
  const book1 = await Book.create({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925
  });

  const book2 = await Book.create({
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960
  });

  // Add sample reviews
  await Review.create({
    bookId: book1._id,
    rating: 5,
    comment: "A classic that never gets old."
  });

  await Review.create({
    bookId: book2._id,
    rating: 4,
    comment: "Powerful and moving."
  });

  console.log("Database seeded successfully");
  mongoose.connection.close();
};

seedDatabase().catch(error => {
  console.error("Error seeding database:", error);
  process.exit(1);
});