const { AuthenticationError } = require( 'apollo-server-express' );
const { signToken } = require( '../utils/auth' );
const { User } = require( '../models' );

const resolvers = {
  Query: {
    me: async ( parent, args, context ) => {
      if ( context.user ) {
        const me = await User.findOne( {
          _id: context.user._id
        } )
          .select( '-__v password' )
          .populate( 'savedBooks' );

        return me;
      }

      throw new AuthenticationError( 'Not logged in' );
    },
    book: async ( parent, args, context ) => {
      // not yet implemented
    },
    users: async ( parent, args, context ) => {
      return User.find();
    },
  },
  Mutation: {
    addUser: async ( parent, args ) => {
      const user = await User.create( args );
      const token = signToken( user );

      return { token, user };
    },
    login: async ( parent, { email, password } ) => {
      const user = await User.findOne( { email } );
      if ( !user ) { throw new AuthenticationError( 'Incorrect Credentials' ); }
      const isCorrectPw = await user.isCorrectPassword( password );
      if ( !isCorrectPw ) { throw new AuthenticationError( 'Incorrect Credentials' ); }

      const token = signToken( user );
      return { token, user };
    },
    saveBook: async ( parent, args, context ) => {

      if ( context.user ) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.book } },
          { new: true, runValidators: true }
        );
        return updatedUser
      }
    },
    removeBook: async ( parent, args, context ) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true },
          );
          return updatedUser
        }
      throw new AuthenticationError("Couldn't find user with this id!")
    },

  }
};

module.exports = resolvers;
