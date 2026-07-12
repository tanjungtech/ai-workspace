import app from './app.js';
import dotenv from 'dotenv';
import { logInfo } from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  logInfo(`Server is running on port ${PORT}`);
});