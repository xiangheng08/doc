import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const loadPath = path.resolve(process.cwd(), 'env');

const ENV_KEYS: { [k in keyof ENV]: string } = {
	base: 'BASE_URL',
	outDir: 'OUT_DIR',
};

const defaultENV: ENV = {
	outDir: '/dist/build',
};

if (process.env.LOAD_ENV?.trim()) {
	const filePath = path.join(loadPath, '.env.' + process.env.LOAD_ENV.trim());

	if (fs.existsSync(filePath)) {
		dotenv.config({ path: filePath });
	}
}
// 解析 env
function parseENV() {
	const env: ENV = {};

	(Object.keys(ENV_KEYS) as (keyof ENV)[]).forEach((key) => {
		if (process.env[ENV_KEYS[key] as string]) {
			env[key] = process.env[ENV_KEYS[key] as string];
		} else if (defaultENV[key]) {
			env[key] = defaultENV[key];
		}
	});

	if (env.outDir) {
		env.outDir = path.join(__dirname, '../', env.outDir);
	}

	return env;
}

/**
 * 解析后的 env
 */
export const ENV = parseENV();

type ENV = {
	base?: string;
	outDir?: string;
};
