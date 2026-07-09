import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/health.routes.js';
import versionRoutes from './routes/version.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import conversationRoutes from "./routes/conversation.routes.js";
import documentRoutes from "./routes/document.routes.js"

import { testDatabaseConnection } from './database/testConnection.js';

const app = express();

app.use(cors());
app.use(express.json());

await testDatabaseConnection();

app.use(healthRoutes);
app.use(versionRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(chatRoutes);
app.use(conversationRoutes);
app.use(documentRoutes);

export default app;
