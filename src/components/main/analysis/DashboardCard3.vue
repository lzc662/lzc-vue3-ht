<template>
  <div class='card'>
    <el-card class='box-card'>
      <template #header>
        {{ props.title }}
      </template>
      <div class='content' ref='refContent'></div>
    </el-card>

  </div>

</template>

<script setup lang='ts'>
import { defineProps, onMounted, ref, getCurrentInstance, computed, reactive, watchEffect } from 'vue'
import echarts from '@/global/echartsInfo'
import chinaJSON from '@/components/main/analysis/china.json'
import type { EChartsCoreOption } from 'echarts'
import { convertData } from '@/utils/modifyDataName.ts'

interface Iprops {
  cardData: any
  title: string
}

let props = defineProps<Iprops>()
const refContent = ref<InstanceType<typeof refContent>>()
const { proxy }: any = getCurrentInstance()

onMounted(() => {
  let arr = []
  let chart: any = proxy.$echarts.init(refContent.value)
  const option = computed<EChartsCoreOption>(() => {
    return {
      backgroundColor: '#fff',
      title: {
        text: '全国销量统计',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params: any) {
          return params.name + ' : ' + params.value[2]
        }
      },
      visualMap: {
        min: 0,
        max: 60000,
        left: 20,
        bottom: 20,
        calculable: true,
        text: ['高', '低'],
        inRange: {
          color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
        },
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        // 设置使用的地图(注册过的china地址)
        map: 'china',
        // 漫步: 支持鼠标缩放效果
        roam: 'scale',
        emphasis: {
          areaColor: '#f4cccc',
          borderColor: 'rgb(9, 54, 95)',
          itemStyle: {
            areaColor: '#f4cccc'
          }
        }
      },
      series: [
        {
          name: '销量',
          // 散点图在地图上展示数据
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(props.cardData),
          // 散点的大小(可以根据数据不同显示不同的大小, 设置为一个函数)
          symbolSize: 12,
          emphasis: {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        },
        {
          // 会自动生成geo地理坐标系统
          type: 'map',
          // 设置使用的地图名称, 复用的是第0个坐标系统
          map: 'china',
          geoIndex: 0,
          // 缩放地图
          aspectScale: 0.75,
          tooltip: {
            show: false
          }
        }
      ]
    }
    // 11
  })
  echarts.registerMap('china', chinaJSON)
  chart.setOption(option.value)
  watchEffect((n: any) => {

    chart.setOption(option.value)
  })
})


</script>

<style scoped lang='less'>

.card {
  .box-card {

    .title {
      font-size: 12px;
      color: #999988;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }


    .content {
      width: 100%;
      height: 260px;
      font-size: 12px;
    }
  }


}


</style>