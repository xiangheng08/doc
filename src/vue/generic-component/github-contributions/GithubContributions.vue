<script setup lang="ts">
import { computed, nextTick, reactive, ref, watchEffect } from 'vue'

// 定义贡献项接口
interface Contribution {
  date: string
  count: number
  level: number
}

interface ContributionRect extends Contribution {
  x: number
  y: number
  row: number
  col: number
  month: number
  fill: string
  stroke: string
}

interface MonthLabel {
  name: string
  x: number
  y: number
}

interface WeekLabel {
  name: string
  x: number
  y: number
}

interface LevelColor {
  light: string
  dark: string
  borderLight: string
  borderDark: string
}

// 定义组件属性
interface Props {
  data: Contribution[]
  dark?: boolean
  background?: boolean
  fixedSize?: boolean
  tooltip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: true,
})

const PADDING_TOP = 4 // 顶部内边距
const PADDING_LEFT = 2 // 左侧内边距
const PADDING_RIGHT = 2 // 右侧内边距
const PADDING_BOTTOM = 0 // 底部内边距
const BLOCK_SIZE = 10 // 每个贡献块的大小
const BLOCK_GAP = 3 // 每个贡献块的间隔
const BLOCK_RADIUS = 2 // 每个贡献块的圆角
const MONTH_HEIGHT = 13 // 月份标签高度
const WEEK_WIDTH = 22 // 周标签的宽度
const LABEL_FONT_SIZE = 9 // 标签字体大小
const LEGEND_HEIGHT = 34 // 图例高度
const LEGEND_BLOCK_GAP = 4 // 图例块间隔
const LEGEND_PADDING = 32 // 图例内边距
const LEGEND_FONT_SIZE = 9 // 图例字体大小

// 贡献块属性
const blockAttributes = {
  width: BLOCK_SIZE,
  height: BLOCK_SIZE,
  rx: BLOCK_RADIUS,
  ry: BLOCK_RADIUS,
}

// 月份简称
const monthAbbrNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// 月份名称
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// 等级颜色
const levelColors: LevelColor[] = [
  {
    light: '#ebedf0',
    dark: '#151b23',
    borderLight: '#1f23280d',
    borderDark: '#0104090d',
  },
  {
    light: '#9be9a8',
    dark: '#033a16',
    borderLight: '#1f23280d',
    borderDark: '#0104090d',
  },
  {
    light: '#40c463',
    dark: '#196c2e',
    borderLight: '#1f23280d',
    borderDark: '#0104090d',
  },
  {
    light: '#30a14e',
    dark: '#2ea043',
    borderLight: '#1f23280d',
    borderDark: '#0104090d',
  },
  {
    light: '#216e39',
    dark: '#56d364',
    borderLight: '#1f23280d',
    borderDark: '#0104090d',
  },
]

// 标签颜色
const labelColors = {
  light: '#767676',
  dark: '#f0f6fc',
}

// 图例文字颜色
const legendTextColors = {
  light: '#59636e',
  dark: '#9198a1',
}

const svgWidth = ref(0)
const svgHeight = ref(0)
const legendCentralAxis = ref(0) // 图例中轴线
const tooltipInfo = reactive({
  x: 0,
  y: 0,
  visible: false,
  text: '',
})

const labelAttributes = computed(() => {
  return {
    fill: props.dark ? labelColors.dark : labelColors.light,
    'font-size': LABEL_FONT_SIZE,
  }
})

const legendTextAttributes = computed(() => {
  return {
    fill: props.dark ? legendTextColors.dark : legendTextColors.light,
    'font-size': LEGEND_FONT_SIZE,
  }
})

const contributionRects = ref<ContributionRect[]>([])
const monthLabels = ref<MonthLabel[]>([])
const weekLabels = ref<WeekLabel[]>([])
const legendContributionRects = ref<ContributionRect[]>([])
const legendMoreTextX = ref(0)
const legendLessTextX = ref(0)

const getLevelColor = (level: number) => {
  const color = levelColors[level] || levelColors[0]
  return props.dark
    ? { fill: color.dark, stroke: color.borderDark }
    : { fill: color.light, stroke: color.borderLight }
}

watchEffect(() => {
  const rects: ContributionRect[] = []
  const months: MonthLabel[] = []

  const baseX = PADDING_LEFT + WEEK_WIDTH + BLOCK_GAP
  const baseY = PADDING_TOP + MONTH_HEIGHT + BLOCK_GAP

  let row = new Date(props.data[0].date).getDay()
  let col = 0

  for (let i = 0; i < props.data.length; i++) {
    const contribution = props.data[i]
    const x = baseX + col * (BLOCK_SIZE + BLOCK_GAP)
    const y = baseY + row * (BLOCK_SIZE + BLOCK_GAP)
    rects.push({
      ...contribution,
      ...getLevelColor(contribution.level),
      x,
      y,
      row,
      col,
      month: new Date(contribution.date).getMonth(),
    })
    row++
    if (row > 6) {
      row = 0
      col++
    }
  }

  let lastMonth = rects[rects.length - 1].month
  let lastCol = rects[rects.length - 1].col
  for (let i = rects.length - 2; i >= 0; i--) {
    const rect = rects[i]
    const next = rects[i + 1]
    const nextNext = rects[i + 2]

    if (rect.month !== lastMonth) {
      const month = rect.col === lastCol ? next.month : nextNext.month
      months.unshift({
        name: monthAbbrNames[month],
        x: next.x,
        y: PADDING_TOP + MONTH_HEIGHT - BLOCK_GAP,
      })
    }

    lastMonth = rect.month
    lastCol = rect.col
  }

  contributionRects.value = rects
  monthLabels.value = months
  weekLabels.value = [
    {
      name: 'Mon',
      x: PADDING_LEFT,
      y: baseY + 1 * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2,
    },
    {
      name: 'Wed',
      x: PADDING_LEFT,
      y: baseY + 3 * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2,
    },
    {
      name: 'Fri',
      x: PADDING_LEFT,
      y: baseY + 5 * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2,
    },
  ]

  const rectGroupWidth = (col + 1) * BLOCK_SIZE + col * BLOCK_GAP
  const rectGroupHeight = 7 * BLOCK_SIZE + 6 * BLOCK_GAP

  svgWidth.value = baseX + rectGroupWidth + PADDING_RIGHT
  svgHeight.value =
    baseY + rectGroupHeight + LEGEND_HEIGHT + PADDING_BOTTOM
  legendCentralAxis.value = baseY + rectGroupHeight + LEGEND_HEIGHT / 2

  legendMoreTextX.value = svgWidth.value - LEGEND_PADDING - 22
  legendLessTextX.value =
    legendMoreTextX.value -
    (BLOCK_SIZE + LEGEND_BLOCK_GAP) * 5 -
    20 -
    LEGEND_BLOCK_GAP

  legendContributionRects.value = Array(5)
    .fill(0)
    .map<ContributionRect>((_, i) => {
      return {
        date: `Level ${i}`,
        count: 0,
        level: i,
        x:
          legendMoreTextX.value -
          (BLOCK_SIZE + LEGEND_BLOCK_GAP) * (5 - i),
        y: legendCentralAxis.value - BLOCK_SIZE / 2,
        row: 0,
        col: 0,
        month: 0,
        ...getLevelColor(i),
      }
    })
})

const formatContributionInfo = (contribution: ContributionRect) => {
  const date = new Date(contribution.date)

  const month = monthNames[date.getMonth()]

  const day = date.getDate()
  const dayWithSuffix = getDayWithOrdinalSuffix(day)

  // 处理没有贡献的情况
  if (contribution.count === 0) {
    return `No contributions on ${month} ${dayWithSuffix}`
  }

  // 根据贡献数量决定单复数形式
  const contributionText =
    contribution.count === 1 ? 'contribution' : 'contributions'

  return `${contribution.count} ${contributionText} on ${month} ${dayWithSuffix}`
}

const getDayWithOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return day + 'th' // 11-20 特殊情况

  switch (day % 10) {
    case 1:
      return day + 'st'
    case 2:
      return day + 'nd'
    case 3:
      return day + 'rd'
    default:
      return day + 'th'
  }
}

const tooltipRef = ref<HTMLDivElement>()

const showTooltip = async (
  event: MouseEvent,
  item: ContributionRect,
  text?: string,
) => {
  if (!props.tooltip) return
  tooltipInfo.visible = true
  tooltipInfo.x = -1000
  tooltipInfo.y = -1000
  tooltipInfo.text = text || formatContributionInfo(item)
  await nextTick()
  if (!tooltipRef.value || !event.target) return
  const { width, height } = tooltipRef.value.getBoundingClientRect()
  const { x, y } = (event.target as SVGRectElement).getBoundingClientRect()
  const centerX = x + BLOCK_SIZE / 2
  tooltipInfo.x = centerX - width / 2
  tooltipInfo.y = y - height - 4
}

// 隐藏工具提示
const hideTooltip = () => {
  if (!props.tooltip) return
  tooltipInfo.visible = false
}

const handleTooltipEnter = () => {
  if (!props.tooltip) return
  tooltipInfo.visible = true
}
const handleTooltipLeave = () => {
  if (!props.tooltip) return
  tooltipInfo.visible = false
}
</script>

<template>
  <div class="contributions" :class="{ dark, background }">
    <svg
      :width="fixedSize ? svgWidth : '100%'"
      :height="fixedSize ? svgHeight : '100%'"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      class="contribution-chart"
    >
      <g class="month-labels">
        <text
          v-for="month in monthLabels"
          :key="month.name"
          :x="month.x"
          :y="month.y"
          text-anchor="start"
          dominant-baseline="text-bottom"
          v-bind="labelAttributes"
        >
          {{ month.name }}
        </text>
      </g>

      <g class="week-labels">
        <text
          v-for="week in weekLabels"
          :key="week.name"
          :x="week.x"
          :y="week.y"
          text-anchor="start"
          dominant-baseline="middle"
          v-bind="labelAttributes"
        >
          {{ week.name }}
        </text>
      </g>

      <g class="contribution-rects">
        <rect
          v-for="item in contributionRects"
          :key="item.date"
          :x="item.x"
          :y="item.y"
          :fill="item.fill"
          :style="{ stroke: item.stroke }"
          :data-level="item.level"
          v-bind="blockAttributes"
          @mouseover="showTooltip($event, item)"
          @mouseleave="hideTooltip"
        />
      </g>

      <g class="legend">
        <text
          :x="legendLessTextX"
          :y="legendCentralAxis"
          text-anchor="start"
          dominant-baseline="middle"
          v-bind="legendTextAttributes"
        >
          Less
        </text>
        <rect
          v-for="item in legendContributionRects"
          :key="item.date"
          :x="item.x"
          :y="item.y"
          :fill="item.fill"
          :style="{ stroke: item.stroke }"
          :data-level="item.level"
          v-bind="blockAttributes"
          @mouseover="showTooltip($event, item, item.date)"
          @mouseleave="hideTooltip"
        />
        <text
          :x="legendMoreTextX"
          :y="legendCentralAxis"
          text-anchor="start"
          dominant-baseline="middle"
          v-bind="legendTextAttributes"
        >
          More
        </text>
      </g>
    </svg>
    <teleport to="body" v-if="tooltip">
      <Transition name="tooltip">
        <div
          class="github-contribution-tooltip"
          :class="{ dark }"
          :style="{
            left: tooltipInfo.x + 'px',
            top: tooltipInfo.y + 'px',
          }"
          v-show="tooltipInfo.visible"
          ref="tooltipRef"
          @mouseenter="handleTooltipEnter"
          @mouseleave="handleTooltipLeave"
        >
          {{ tooltipInfo.text }}
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<style scoped lang="scss">
.contributions {
  &.background {
    padding: 8px;
    border-radius: 6px;
    background-color: #fff;
  }

  &.dark {
    &.background {
      background-color: #0d1117;
    }
  }
}

.github-contribution-tooltip {
  position: fixed;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.5;
  background-color: #25292e;
  color: #fff;
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 4px;
  }
  &.dark {
    background-color: #3d444d;
  }
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.1s ease-in;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>
