import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import schema from './schemas';

const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        'editor.theme': 'light',
        'request.credentials': 'include'
      }
    })
  ]
});

server
  .listen(PORT)
  .then(() => {
    console.log(`Server is up on ${PORT} 🍜 `);
  })
  .catch((error) => {
    console.error(`Server Error => ${error}`);
  });
