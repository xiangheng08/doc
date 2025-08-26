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

const PADDING_TOP = 4 // 顶部内边距
const BLOCK_SIZE = 10 // 每个贡献块的大小
const BLOCK_GAP = 2 // 每个贡献块的间隔
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
  class: 'contribution-rect',
}

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
const legendCentralAxis = ref(0) // 图例中轴线

const contributionRects = ref<ContributionRect[]>([])
const monthLabels = ref<MonthLabel[]>([])
const weekLabels = ref<WeekLabel[]>([])

const fn = () => {
  const rects: ContributionRect[] = []
  const months: MonthLabel[] = []

  const baseX = WEEK_WIDTH + BLOCK_GAP
  const baseY = PADDING_TOP + MONTH_HEIGHT + BLOCK_GAP

  let row = new Date(props.data[0].date).getDay()
  let col = 0

  for (let i = 0; i < props.data.length; i++) {
    const contribution = props.data[i]
    const x = baseX + col * (BLOCK_SIZE + BLOCK_GAP)
    const y = baseY + row * (BLOCK_SIZE + BLOCK_GAP)
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
    const nextNext = rects[i + 2]

    if (rect.month !== lastMonth) {
      const month = rect.col === lastCol ? next.month : nextNext.month
      months.push({
        name: monthNames[month],
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
      x: 0,
      y: baseY + 1 * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2,
    },
    {
      name: 'Wed',
      x: 0,
      y: baseY + 3 * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2,
    },
    {
      name: 'Fri',
      x: 0,
      y: baseY + 5 * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2,
    },
  ]

  svgWidth.value = baseX + (col + 1) * (BLOCK_SIZE + BLOCK_GAP)
  svgHeight.value = baseY + 7 * (BLOCK_SIZE + BLOCK_GAP) + LEGEND_HEIGHT
  legendCentralAxis.value =
    baseY + 7 * (BLOCK_SIZE + BLOCK_GAP) + LEGEND_HEIGHT / 2
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
          :font-size="LABEL_FONT_SIZE"
          text-anchor="start"
          dominant-baseline="text-bottom"
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
          :font-size="LABEL_FONT_SIZE"
          text-anchor="start"
          dominant-baseline="middle"
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
          v-bind="blockAttributes"
        />
      </g>

      <g class="legend">
        <text
          :x="
            svgWidth -
            LEGEND_PADDING -
            32 -
            LEGEND_BLOCK_GAP * 2 -
            (BLOCK_SIZE + LEGEND_BLOCK_GAP) * 4
          "
          :y="legendCentralAxis"
          :font-size="LEGEND_FONT_SIZE"
          text-anchor="end"
          dominant-baseline="middle"
          class="legend-text"
        >
          Less
        </text>
        <rect
          v-for="(n, i) in 5"
          :x="
            svgWidth -
            LEGEND_PADDING -
            32 -
            LEGEND_BLOCK_GAP -
            (BLOCK_SIZE + LEGEND_BLOCK_GAP) * (5 - n)
          "
          :y="legendCentralAxis - BLOCK_SIZE / 2"
          :data-level="i"
          v-bind="blockAttributes"
        />
        <text
          :x="svgWidth - LEGEND_PADDING"
          :y="legendCentralAxis"
          :font-size="LEGEND_FONT_SIZE"
          text-anchor="end"
          dominant-baseline="middle"
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
    .legend-text {
      color: #9198a1;
    }
  }

  .label-text {
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
    fill: #59636e;
  }
}
</style>
