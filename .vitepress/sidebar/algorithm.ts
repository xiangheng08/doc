import { DefaultTheme } from 'vitepress'

export default [
  { link: '/algorithm/' },
  { link: '/algorithm/big-o-notation' },
  { link: '/algorithm/fisher-yates' },
  {
    text: '排序算法',
    items: [
      { text: '冒泡排序', link: '/algorithm/sorting/bubble-sort' },
      { text: '选择排序', link: '/algorithm/sorting/selection-sort' },
      { text: '插入排序', link: '/algorithm/sorting/insertion-sort' },
      { text: '希尔排序', link: '/algorithm/sorting/shell-sort' },
      { text: '归并排序', link: '/algorithm/sorting/merge-sort' },
      { text: '快速排序', link: '/algorithm/sorting/quick-sort' },
      { text: '堆排序', link: '/algorithm/sorting/heap-sort' },
      { text: '计数排序', link: '/algorithm/sorting/counting-sort' },
      { text: '桶排序', link: '/algorithm/sorting/bucket-sort' },
      { text: '基数排序', link: '/algorithm/sorting/radix-sort' },
    ],
  },
] satisfies DefaultTheme.Sidebar