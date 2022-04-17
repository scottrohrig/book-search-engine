const path = require('path');
const express = require('express');
const { ApolloServer } = require( 'apollo-server-express' );

const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth')

const app = express();
const PORT = process.env.PORT || 3001;

// create the start function for the server
const startServer = async () => {

  // instance a new apollo server with the typeDefs and resolvers (set the context to the auth middleware when it's setup)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  })
  // await for the server to start()
  await server.start()
  // apply the middleware on the app
  server.applyMiddleware({app})
  // log where to test GQL API
  console.log( `Use GraphQL at http://localhost:${ PORT }${ server.graphqlPath }` );
};

// start the server
startServer()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..client/build/index.html'))
})

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
