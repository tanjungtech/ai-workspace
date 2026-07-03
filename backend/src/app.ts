import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/health.routes.js';
import versionRoutes from './routes/version.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(healthRoutes);
app.use(versionRoutes);
app.use(authRoutes);

export default app;
