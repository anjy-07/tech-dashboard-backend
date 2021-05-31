import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema/schema';
import { resolvers } from './graphql/resolvers/resolvers';
import { Request, Response, NextFunction } from 'express';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express from 'express';

export const app = express()

const apolloServer = new ApolloServer({ typeDefs, resolvers })
apolloServer.applyMiddleware({ app })

app.use(logger('dev'));
app.use(csurf({cookie: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

const http = require('http');

const port = process.env.PORT || '3000';

app.set('port', port);
let server = http.createServer(app);

server.listen(port);