<script setup lang="ts">
import { ref, watchEffect } from 'vue'

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
  title?: string
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

// 定义组件属性
interface Props {
  data: Contribution[]
  dark?: boolean
  background?: boolean
}

const props = defineProps<Props>()

const BLOCK_SIZE = 10 // 每个贡献块的大小
const BLOCK_MARGIN = 2 // 每个贡献块的间距
const MONTH_HEIGHT = 13 // 月份标签高度
const WEEK_WIDTH = 18 // 周标签的宽度
const LEGEND_HEIGHT = 30 // 图例高度

// 月份名称
const monthNames = [
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

const svgWidth = ref(0)
const svgHeight = ref(0)
const legendBaseY = ref(0)

const contributionRects = ref<ContributionRect[]>([])
const monthLabels = ref<MonthLabel[]>([])
const weekLabels = ref<WeekLabel[]>([])

const fn = () => {
  const rects: ContributionRect[] = []
  const months: MonthLabel[] = []

  const baseX = WEEK_WIDTH + BLOCK_MARGIN
  const baseY = MONTH_HEIGHT + BLOCK_MARGIN

  let row = new Date(props.data[0].date).getDay()
  let col = 0

  for (let i = 0; i < props.data.length; i++) {
    const contribution = props.data[i]
    const x = baseX + col * (BLOCK_SIZE + BLOCK_MARGIN)
    const y = baseY + row * (BLOCK_SIZE + BLOCK_MARGIN)
    rects.push({
      ...contribution,
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

    if (rect.month !== lastMonth) {
      if (rect.col === lastCol) {
        months.push({ name: monthNames[next.month], x: next.x, y: 12 })
      } else {
        const nextNext = rects[i + 2]
        months.push({
          name: monthNames[nextNext.month],
          x: nextNext.x,
          y: 12,
        })
      }
    }

    lastMonth = rect.month
    lastCol = rect.col
  }

  contributionRects.value = rects
  monthLabels.value = months
  weekLabels.value = [
    { name: 'Mon', x: 0, y: baseY + 1 * (BLOCK_SIZE + BLOCK_MARGIN) + 8 },
    { name: 'Wed', x: 0, y: baseY + 3 * (BLOCK_SIZE + BLOCK_MARGIN) + 8 },
    { name: 'Fri', x: 0, y: baseY + 5 * (BLOCK_SIZE + BLOCK_MARGIN) + 8 },
  ]

  svgWidth.value = baseX + (col + 1) * (BLOCK_SIZE + BLOCK_MARGIN)
  svgHeight.value = baseY + 7 * (BLOCK_SIZE + BLOCK_MARGIN) + LEGEND_HEIGHT
  legendBaseY.value = baseY + 7 * (BLOCK_SIZE + BLOCK_MARGIN)
}

watchEffect(fn)
</script>

<template>
  <div class="contributions" :class="{ dark, background }">
    <svg
      width="100%"
      height="100%"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      class="contribution-chart"
    >
      <g class="month-labels">
        <text
          v-for="month in monthLabels"
          :key="month.name"
          :x="month.x"
          :y="month.y"
          height="10"
          text-anchor="start"
          class="label-text"
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
          height="10"
          class="label-text"
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
          :data-level="item.level"
          width="10"
          height="10"
          rx="2"
          ry="2"
          class="contribution-rect"
        />
      </g>

      <g class="legend">
        <text
          :x="svgWidth - 89"
          :y="legendBaseY + 20"
          text-anchor="end"
          class="legend-text"
        >
          Less
        </text>
        <rect
          v-for="(n, i) in 5"
          :x="
            svgWidth - BLOCK_MARGIN - 35 - (BLOCK_SIZE + BLOCK_MARGIN) * i
          "
          :y="legendBaseY + 11"
          width="10"
          height="10"
          rx="2"
          ry="2"
          :data-level="5 - n"
          class="contribution-rect"
        />
        <text
          :x="svgWidth - BLOCK_MARGIN"
          :y="legendBaseY + 20"
          text-anchor="end"
          class="legend-text"
        >
          More
        </text>
      </g>
    </svg>
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
    .contribution-rect {
      &[data-level='0'] {
        fill: #151b23;
      }
      &[data-level='1'] {
        fill: #033a16;
      }
      &[data-level='2'] {
        fill: #196c2e;
      }
      &[data-level='3'] {
        fill: #2ea043;
      }
      &[data-level='4'] {
        fill: #56d364;
      }
    }

    .label-text {
      fill: #f0f6fc;
    }
  }
}

.chart-container {
  position: relative;
  display: inline-block;
}

.contribution-chart {
  overflow: visible;
}

.label-text {
  font-size: 9px;
  fill: #767676;
}

.contribution-rect {
  &[data-level='0'] {
    fill: #ebedf0;
  }
  &[data-level='1'] {
    fill: #9be9a8;
  }
  &[data-level='2'] {
    fill: #40c463;
  }
  &[data-level='3'] {
    fill: #30a14e;
  }
  &[data-level='4'] {
    fill: #216e39;
  }
}

.legend-text {
  margin: 0 4px;
  font-size: 9px;
  line-height: 18px;
  fill: #767676;
}
</style>
