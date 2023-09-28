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
import { defineProps, onMounted, ref, getCurrentInstance, computed, watchEffect } from 'vue'
import type { EChartsCoreOption } from 'echarts'

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
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },

          type: 'pie',
          radius: [10, 120],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: arr

        }
      ]
    }
  })
  chart.setOption(option.value)
  watchEffect(() => {
    arr.splice(0, arr.length)
    for (const item in props?.cardData) {
      if (props.cardData[item].value != 0) {
        const obj = { value: props.cardData[item].goodsCount, name: props.cardData[item].name }
        arr.push(obj)
      }
    }

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