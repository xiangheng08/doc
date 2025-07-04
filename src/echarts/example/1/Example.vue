<script setup lang="ts">
import { nextTick, ref } from 'vue'
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import { CustomChart } from 'echarts/charts'

// @ts-ignore 类型报错，懒得解决
echarts.use([CustomChart])

// 辅助函数
const addThousandsSeparator = (num: number | string, decimal = 0) => {
  const [int, dec = ''] = String(num).split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (decimal > 0) {
    return `${formatted}.${dec.slice(0, decimal).padEnd(decimal, '0')}`
  } else {
    return formatted
  }
}

const data = [
  { name: '产品A', revenue: 10000, cost: 6000 },
  { name: '服务B', revenue: 8500, cost: 5100 },
  { name: '商品C', revenue: 15000, cost: 12000 },
  { name: '订阅D', revenue: 5000, cost: 1000 },
  { name: '定制E', revenue: 12000, cost: 9000 },
]

const option = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: 90,
    bottom: 20,
    right: '5%',
  },
  xAxis: {
    type: 'category',
    data: data.map((v) => v.name),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      name: '实收',
      data: data.map((v) => v.revenue),
    },
    {
      type: 'bar',
      name: '成本',
      data: data.map((v) => v.cost),
    },
    {
      type: 'custom',
      data: Array(data.length).fill(0),
      // 不要在 tooltip 中显示这个数据
      tooltip: { show: false },
      z: 3,
      renderItem(params: any, api: any) {
        const item = data[params.dataIndex]
        // 毛利率
        const rate = ((item.revenue - item.cost) / item.revenue) * 100

        const [x, y] = api.coord([
          api.value(0),
          Math.max(item.revenue ?? 0, item.cost ?? 0),
        ])

        const children: any = [
          {
            type: 'text',
            style: {
              text: addThousandsSeparator(item.cost),
              x: x,
              y: y - 22,
              fill: '#91cc75',
              fontSize: 16,
              fontWeight: 700,
              textAlign: 'center',
            },
          },
          {
            type: 'text',
            style: {
              text: addThousandsSeparator(item.revenue),
              x: x,
              y: y - 40,
              fill: '#5470c6',
              fontSize: 16,
              fontWeight: 700,
              textAlign: 'center',
            },
          },
          {
            type: 'rect',
            shape: {
              x: x - 40,
              y: y - 86,
              width: 80,
              height: 40,
            },
            style: {
              fill: '#EAF7F9',
              stroke: '#0CA7B8',
            },
          },
          {
            type: 'text',
            style: {
              text: rate.toFixed(2) + '%',
              x: x,
              y: y - 83,
              fill: '#0CA7B8',
              fontSize: 16,
              fontWeight: 700,
              textAlign: 'center',
            },
          },
          {
            type: 'text',
            style: {
              text: '毛利率',
              x: x,
              y: y - 63,
              fill: '#222222',
              fontSize: 12,
              textAlign: 'center',
            },
          },
        ]

        return {
          type: 'group',
          children,
          enterFrom: { y: api.getHeight() - 20 }
        }
      },
    },
  ],
}

const show = ref(true)

const handleRerender = async () => {
  show.value = false
  await nextTick()
  show.value = true
}
</script>

<template>
  <button @click="handleRerender">重新渲染</button>
  <v-chart
    v-if="show"
    :option="option"
    autoresize
    style="width: 100%; height: 400px"
  />
</template>
