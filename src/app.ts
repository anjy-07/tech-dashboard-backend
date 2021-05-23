import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema/schema';
import { resolvers } from './graphql/resolvers/resolver';
import { Request, Response, NextFunction } from 'express';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express from 'express';
import Debug from 'debug';

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
    console.log(res)
    next();
});

const debug = Debug('tech-pinterest-backend:server');
const http = require('http');

const normalizePort = (val: string) => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
let server = http.createServer(app);

server.listen(port);

const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

server.on('listening', onListening);

