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

interface Iprops {
  cardData: any
  title: string
}

// const arr = computed(() => {
//   return this.props.cardData.map(item => ({
//     value: item.goodsCount,
//     name: item.name
//   }))
// })
// console.log(arr)

let props = defineProps<Iprops>()
const refContent = ref<InstanceType<typeof refContent>>()
const { proxy }: any = getCurrentInstance()
onMounted(() => {
  let arr = []
  let chart: any = proxy.$echarts.init(refContent.value)
  const option = computed<EChartsCoreOption>(() => {
    return {

      tooltip: {
        trigger: 'item'
      },
      legend: {
        left: 'center',
        top: '0'
      },
      series: [
        {

          type: 'pie',
          radius: '60%',
          top: '12%',
          center: ['50%', '50%'],
          data: arr,
          emphasis: {
            itemStyle: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }

        }
      ]
    }
  })
  chart.setOption(option.value)
  watchEffect((n: any) => {
    arr.splice(0, arr.length)
    for (const item in props?.cardData) {
      props.cardData[item].value = props.cardData[item].goodsCount
      if (props.cardData[item].value != 0) {
        const obj = { value: props.cardData[item].value, name: props.cardData[item].name }
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