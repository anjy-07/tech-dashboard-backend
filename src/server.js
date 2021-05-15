var express = require('express');

var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type User {
        id: String
        name: String
        email: String
        password: String
        bio: String
        mobile: String
        username: String
        plan: String
        active: Boolean
        Type: String
        date_created: String
        date_updated: String
        boards : [Board]
    },
    type Board {
        id: String
        name: String
        category: String
        tags: String
        pins: [Pin]
        created_at: String
        updated_at: String
    },
    type Pin {
        id: String
        name: String
        description: String
        url: String
        image: String
        category: String
        tags: String
        created_at: String
        updated_at: String
    }
`);

var userData = [
    {
        id: '1',
        name: 'Anjali',
        email: 'anjaliverma471@gmail.com',
        password: 'xyz',
        bio: 'software developer',
        mobile: '9999711499',
        username: 'anjy-07',
        plan: 'premium',
        active: true,
        type: 'xyz',
        date_created: '2020-06-01',
        date_updated: '2020-06-03',
        boards : []
    },
    {
        id: '2',
        name: 'Prasheel',
        email: 'ps011@gmail.com',
        password: 'xyz',
        bio: 'software engineer',
        mobile: '989167112',
        username: 'ps011',
        plan: 'premium',
        active: true,
        type: 'xyz',
        date_created: '2020-06-01',
        date_updated: '2020-06-03',
        boards : []
    }
]
var getUser = function(args) { 
    var email = args.email;
    return userData.filter(user => {
        return user.email == email;
    })[0];
}
var root = {
    user: getUser,
    /*courses: getCourses,*/
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }))
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));