const { ApolloServer } = require('apollo-server');
const { gql } = require('graphql-tag');

const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');
const Post = require('./models/Post');

const PORT = process.env.port || 5000;

const typeDefs = gql`
type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
}
 type Query {
     getPost:[Post]
 }
`;
const resolvers = {
    Query: {
        async getPost() {
            try {

                const posts = await Post.find();
                return posts;

            } catch (error) {
                console.error(error);
            }
        }
    }
};


const server = new ApolloServer({ typeDefs, resolvers });


mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err)
    })