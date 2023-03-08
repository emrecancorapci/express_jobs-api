import Express from 'express';
import 'express-async-errors';

import authentication from './middleware/authentication.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';

const app = Express();

app.use(Express.json());

app.use('/api/v1/Auth', authRouter);
app.use('/api/v1/Jobs', authentication, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
