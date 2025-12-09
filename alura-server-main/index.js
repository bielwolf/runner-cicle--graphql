const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const http = require('http');
const { PubSub } = require('graphql-subscriptions');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const fs = require('fs');

const pubsub = new PubSub();
const ACTIVITY_ADDED = 'ACTIVITY_ADDED';

// Carregar dados iniciais
let activities = JSON.parse(fs.readFileSync('./data/activities.json', 'utf8'));

const typeDefs = gql`
  type Activity {
    id: ID!
    time: String!
    type: String!
    distance: Float!
    calories: Float!
    bpm: String!
    user: String!
    userImage: String!
    imageUrl: String!
  }

  input ActivityInput {
    time: String!
    type: String!
    distance: Float!
    calories: Float!
    bpm: String!
    user: String!
    userImage: String!
    imageUrl: String!
  }

  type Query {
    mockActivities(user: String, offset: Int, limit: Int): [Activity]
  }

  type Mutation {
    addActivity(input:
    ActivityInput!):
    Activity
  }

  type Subscription {
    activityAdded: Activity
  }
`;

const resolvers = {
  Query: {
    mockActivities: (_, { user, offset = 0, limit = 100 }) => {
      if (user) {
        return activities.filter(activity => activity.user === user);
      }
      return activities;
    },
  },
  Mutation: {
    addActivity: (_, { input }) => {
      const newActivity = {
        id: activities.length + 1,
        ...input
      };
      activities.push(newActivity);
      fs.writeFileSync('./data/activities.json', JSON.stringify(activities, null, 2));
      pubsub.publish(ACTIVITY_ADDED, { activityAdded: newActivity });
      return newActivity;
    },
  },
  Subscription: {
    activityAdded: {
      subscribe: () => pubsub.asyncIterator([ACTIVITY_ADDED]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const server = http.createServer(app);

const apolloServer = new ApolloServer({
  schema,
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: () => console.log('Connected to websocket'),
    },
    {
      server: server,
      path: '/graphql', 
    }
  );

  server.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:4000/graphql`);
  });
});