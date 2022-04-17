const { AuthenticationError } = require( 'apollo-server-express' );
const { } = require( '../models' );
const { signToken } = require( '../utils/auth' );

const resolvers = {
  Query: {
    me: async ( parent, args, context ) => { },
    book: async ( parent, args, context ) => { },
    users: async ( parent, args, context ) => { },
  },
  Mutation: {
    addUser: async ( parent, args ) => { },
    login: async ( parent, { email, password } ) => { },
    saveBook: async ( parent, { email, password } ) => { },
    removeBook: async ( parent, { email, password } ) => { },

  }
};
