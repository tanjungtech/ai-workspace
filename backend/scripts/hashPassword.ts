import bcrypt from 'bcrypt';
import { logInfo } from '../src/utils/logger.js';

async function main() {
    const password = 'Password123!';

    const hash = await bcrypt.hash(password, 10);

    logInfo('Password:', password);
    logInfo('Hash:', hash);
}

main().catch(console.error);