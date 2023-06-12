import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { resolvers } from '../controllers/resolvers';
import { typeDefs } from '../controllers/typesDefs';
import { ApolloServer } from 'apollo-server-express';
import type { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const startApollo = async (app: Express) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    /* Create Context to Functionally Auth */
    context: ({ req, res }) => {
      const getToken = req.cookies.token || req.headers.authorization;
      let userProfile;
      let isAuthenticated = false;
      try {
        if (getToken) {
          /* Decoded Token */
          const getTokenDecoded = jwt.verify(getToken, process.env.TOKEN_SECRET as string);
          /* console.log(getTokenDecoded); */
          userProfile = getTokenDecoded;
          isAuthenticated = true;
          return { userProfile, isAuthenticated };
        }
      } catch (err) {
        throw new AuthenticationError('User not authenticate');
      }
    }
  });
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app,
      path: '/graphql',
      cors: {
        origin: [
          'https://studio.apollographql.com',
          'https://project-graph.onrender.com'
          /* Add Render URL, delete the render URL to test on local */
        ],
        credentials: true
      }
    });
  } catch (err) {
    throw err;
  }
};
