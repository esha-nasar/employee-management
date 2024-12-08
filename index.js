require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const { authenticate } = require('./auth');

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: true, 
      context: ({ req }) => {
        const user = authenticate(req);
        return { user };
      },
    });

    server.listen({ port: 4000 }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
