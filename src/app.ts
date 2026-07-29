import express, { Application } from 'express';
import requestLogger from './middlewares/requestLogger';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app: Application = express();

// Body parsing
app.use(express.json());

// Logging
app.use(requestLogger);

// API routes
app.use('/api', routes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
