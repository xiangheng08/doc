import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const loadPath = path.resolve(process.cwd(), 'env');

if (process.env.LOAD_ENV?.trim()) {
	const filePath = path.join(loadPath, '.env.' + process.env.LOAD_ENV.trim());

	if (fs.existsSync(filePath)) {
		dotenv.config({ path: filePath });
	}
}
