# Book Review API

This is a simple API for managing book reviews. Users can add reviews to books, retrieve books, and view associated reviews.

## Features

- Add a review to a book
- Retrieve book details
- View associated reviews

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (installed and running locally or remotely)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/book-review-graphql.git
   cd book-review-graphql
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   MONGODB_URI=Your Database URL
   PORT=4000
   ```

4. **Start the server**:

   ```bash
   npm start
   ```

   The API will run on `http://localhost:4000`.

### Usage

#### Adding a Review

To add a review to a book, use the following GraphQL mutation:

```graphql
mutation {
  addReview(bookId: "66bd84b66ac88394fac44249", rating: 5, comment: "A chilling and prescient novel.") {
    id
    rating
    comment
    book {
      title
    }
  }
}
```

#### Retrieving a Book

To retrieve a book and its details, use the following GraphQL query:

```graphql
query {
  book(id: "66bd84b66ac88394fac44249") {
    id
    title
  }
}
```

### Environment Variables

- `MONGODB_URI`: The URI to connect to your MongoDB database.
- `PORT`: The port on which the API server will run.
