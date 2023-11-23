import frontend from './frontend'
import git from './git'
import other from './other'
import backend from './backend';
import question from './question';

export default {
	// 前端
	'/frontend/': frontend,
	// 后端
	'/backend/': backend,
	// git
	'/git/': git,
	// 面试题
	'/question/': question,
	// 其他
	'/other/': other,
};
