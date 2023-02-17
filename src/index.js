import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import env from './config/env';
import routes from './routes';

const production = env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());
app.use(cookieParser());

// Normal express config defaults
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride());

if (!production) {
  app.use(errorhandler());
}

// connect app to routes
app.use('/v1.0/api', routes);

// development error handler
if (!production) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// routes
app.use('/api/v1', routes);
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to ISchedule Project Backend',
}));

app.all('*', (req, res) => res.send({ message: 'route not found' }));

// start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}\nVisit http://localhost:${server.address().port}`);
});

export default app;
