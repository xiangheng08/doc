<script setup>
const repositoryUrl = import.meta.env.VITE_REPOSITORY_URL?.trim() || 'https://gitee.com/xiangheng08/doc'
const issuesUrl = import.meta.env.VITE_ISSUES_URL?.trim() || 'https://gitee.com/xiangheng08/doc/issues'
const prUrl = import.meta.env.VITE_PR_URL?.trim() || 'https://gitee.com/xiangheng08/doc/pulls'
</script>

# 关于本站

最初，我使用 Typora 来做笔记，但随着学习和工作的需要，需要频繁在两台电脑之间切换，导致笔记分散在各处，管理起来非常不便。后来，我接触到了 VuePress，并进一步了解了 VitePress，于是决定用 VitePress 来整理和书写笔记，这才有了现在的这个站点。

其实主要还是为了方便自己 CV（哈哈），但如果有幸能帮到别人，那就更好了。

本站的大部分内容来源于网络，使用的技术也都基于开源项目。秉承开源精神，本站同样以 MIT 许可协议开源。如果感兴趣，可以访问 <a :href="repositoryUrl" target="_blank" rel="noreferrer">doc</a> 查看详情。如果顺手点个 Star，那就再好不过啦 (●'◡'●)。

如果发现任何错误，欢迎提交 <a :href="issuesUrl" target="_blank" rel="noreferrer">Issue</a> 或 <a :href="prUrl" target="_blank" rel="noreferrer">PR</a>，我会尽快处理，非常感谢你的支持！
