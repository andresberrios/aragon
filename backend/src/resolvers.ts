import { IResolvers } from 'apollo-server'

const resolvers: IResolvers = {
  Query: {
    hello: (obj, args) => 'world'
  },
};

export default resolvers;
