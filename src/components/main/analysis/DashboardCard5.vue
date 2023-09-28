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
import type { EChartsCoreOption } from 'echarts'
import { modifyNameTwo } from '@/utils/modifyDataName'

interface Iprops {
  cardData: any
  title: string
}


let props = defineProps<Iprops>()
const refContent = ref<InstanceType<typeof refContent>>()
const { proxy }: any = getCurrentInstance()


onMounted(() => {
  let arr1 = [] //名称
  let arr2 = [] //数量
  let chart: any = proxy.$echarts.init(refContent.value)
  const option = computed<EChartsCoreOption>(() => {
    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: arr1

      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          color: 'skyblue',
          data: arr2,
          type: 'line',
          areaStyle: {}

        }
      ]
    }
  })
  chart.setOption(option.value)
  watchEffect(() => {
    modifyNameTwo(arr1, arr2, props.cardData)
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
      height: 280px;
      font-size: 12px;
    }
  }


}


</style>