import { gql } from 'apollo-server';

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int
    reviews: [Review!]
  }

  type Review {
    id: ID!
    book: Book!
    rating: Int!
    comment: String
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    reviews: [Review!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, publishedYear: Int): Book!
    addReview(bookId: ID!, rating: Int!, comment: String): Review!
  }
`;

export default typeDefs;