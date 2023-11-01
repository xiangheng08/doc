import frontend from './frontend'
import git from './git'
import other from './other'
import backend from './backend';

export default {
	// 前端
	'/frontend/': frontend,
	// 后端
	'/backend/': backend,
	// git
	'/git/': git,
	// 其他
	'/other/': other,
};
