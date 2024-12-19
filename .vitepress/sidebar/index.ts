import { DefaultTheme } from 'vitepress'
import git from './git'
import electron from './electron'
import elementPlus from './element-plus'
import eslint from './eslint'
import layout from './layout'
import manager from './manager'
import note from './note'
import reactNative from './react-native'
import ts from './ts'
import react from './react'
import html from './html'
import css from './css'
import vscode from './vscode'
import js from './js'
import nodejs from './nodejs'
import vue from './vue'
import vitepress from './vitepress'
import browser from './browser'

export default {
  '/git/': git,
  '/electron/': electron,
  '/element-plus/': elementPlus,
  '/eslint/': eslint,
  '/layout/': layout,
  '/manager/': manager,
  '/note/': note,
  '/react-native/': reactNative,
  '/ts/': ts,
  '/react/': react,
  '/html/': html,
  '/css/': css,
  '/vscode/': vscode,
  '/js/': js,
  '/nodejs/': nodejs,
  '/vue/': vue,
  '/vitepress/': vitepress,
  '/browser/': browser,
} satisfies DefaultTheme.Sidebar
