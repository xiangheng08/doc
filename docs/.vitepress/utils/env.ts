import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const loadPath = path.resolve(process.cwd(), 'env');

const filePath = path.join(loadPath, '.env.' + process.env.LOAD_ENV);

if (fs.existsSync(filePath)) {
	dotenv.config({ path: filePath });
}
