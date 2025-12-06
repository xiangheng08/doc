<script setup lang="ts">
import { ref, watch } from 'vue'
import ccf from 'css-color-function'

const lightConfig = {
  'dark-2': 'shade(20%)',
  'light-3': 'tint(30%)',
  'light-5': 'tint(50%)',
  'light-7': 'tint(70%)',
  'light-8': 'tint(80%)',
  'light-9': 'tint(90%)',
}

const darkConfig = {
  'dark-2': 'tint(20%)',
  'light-3': 'shade(20%)',
  'light-5': 'shade(30%)',
  'light-7': 'shade(50%)',
  'light-8': 'shade(60%)',
  'light-9': 'shade(70%)',
}

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/
const prefix = '--el-color-'

const color = ref('#409eff')
const type = ref('primary')
const error = ref('')
const code = ref('')

const handleColorChange = () => {
  if (!hexColorRegex.test(color.value)) {
    error.value = '请输入正确的 HEX 颜色值'
    return
  } else {
    error.value = ''
  }

  generateCssVariables()
}

const handleTypeChange = () => {
  if (error.value) return
  generateCssVariables()
}

watch(color, handleColorChange)
watch(type, handleTypeChange)

const generateCssVariables = () => {
  const varName = `${prefix}${type.value}`
  const lightVars: string[] = []
  const darkVars: string[] = []

  lightVars.push(`${varName}: ${color.value};`)

  Object.entries(lightConfig).forEach(([key, transform]) => {
    const func = `color(${color.value} ${transform})`
    const value = ccf.convert(func)
    lightVars.push(`${varName}-${key}: ${value};`)
  })

  Object.entries(darkConfig).forEach(([key, transform]) => {
    const func = `color(${color.value} ${transform})`
    const value = ccf.convert(func)
    darkVars.push(`${varName}-${key}: ${value};`)
  })

  code.value = `:root {
  ${lightVars.join('\n  ')}
}

html.dark {
  ${darkVars.join('\n  ')}
}`
}

generateCssVariables()
</script>

<template>
  <div class="color-info language-none vp-adaptive-theme">
    <input type="color" v-model="color" />
    <input type="text" v-model="color" />
    <span class="error" v-if="error">{{ error }}</span>
    <input type="text" v-model="type" />
  </div>
  <div class="language-none vp-adaptive-theme">
    <pre
      class="css-code shiki shiki-themes github-light github-dark vp-code"
    ><code>{{ code }}</code></pre>
  </div>
</template>

<style lang="scss" scoped>
.color-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;

  input[type='text'] {
    width: 100px;
    height: 32px;
    padding: 4px 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #409eff;
    }
  }

  .error {
    color: red;
    font-size: 12px;
  }
}
</style>
