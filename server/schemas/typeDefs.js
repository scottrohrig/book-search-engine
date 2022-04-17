const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # https://graphql.org/graphql-js/mutations-and-input-types/
  input BookUpdate {
    bookId: String!
    author: [String]
    description: String
    image: String
    link: String
    title: String
  }

  type Query {
    me: User
    book: Book # not yet implemented
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(book: BookUpdate!): User # look into 'input' type to handle params
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
