const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # https://graphql.org/graphql-js/mutations-and-input-types/
  # input BookMessage {
  #   content: String
  #   author: String
  # }


  type Query {
    me: User
  }
  type Mutation {
    addUser: Auth
    login: Auth
    saveBook: User # look into 'input' type to handle params
    removeBook(bookId: ID): User
  }
`;

module.exports = typeDefs;
