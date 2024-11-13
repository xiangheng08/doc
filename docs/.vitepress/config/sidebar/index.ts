import git from './git';
import other from './other';
import backend from './backend';
import question from './question';

import htmlSidebar from './frontend/html';
import cssSidebar from './frontend/css';
import jsSidebar from './frontend/js';
import layoutSidebar from './frontend/layout';
import nodejsSidebar from './frontend/nodejs';
import managerSidebar from './frontend/manager';
import vueSidebar from './frontend/vue';
import reactSidebar from './frontend/react';
import reactNativeSidebar from './frontend/react-native';
import tsSidebar from './frontend/ts';
import vitepressSidebar from './frontend/vitepress';
import electronSidebar from './frontend/electron';
import noteSidebar from './frontend/note';

export default {
  // // 前端
  // '/frontend/': frontend,
  // 后端
  '/backend/': backend,
  // git
  '/git/': git,
  // 面试题
  '/question/': question,
  // 其他
  '/other/': other,

  ...Object.assign(
    {},
    htmlSidebar,
    cssSidebar,
    jsSidebar,
    layoutSidebar,
    nodejsSidebar,
    managerSidebar,
    vueSidebar,
    reactSidebar,
    reactNativeSidebar,
    tsSidebar,
    vitepressSidebar,
    electronSidebar,
    noteSidebar
  ),
};
