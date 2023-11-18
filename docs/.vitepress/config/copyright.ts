// 著作权所属
const _default = '<a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2023023348号</a>';
const gitee = '<a href="https://gitee.com/laowans" target="_blank">laowans</a>';
const github = '<a href="https://github.com/laowans" target="_blank">laowans</a>';

let copyright

switch (process.env.LOAD_ENV?.trim()) {
	case 'gitee_page':
    copyright = gitee;
    break
	case 'github_page':
    copyright = github;
    break
	default:
    copyright = _default;
    break
}

export default 'Copyright © 2022-present ' + copyright;
