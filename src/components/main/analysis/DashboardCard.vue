<template>

  <div class='card'>
    <el-card class='box-card'>
      <template #header>
        <div class='card-header'>
          <div class='title'>
            <span class='title'>
              {{ cardData?.title }}
            </span>
            <el-tooltip
              effect='dark'
              :content='cardData.tips'
              placement='top'
            >
              <el-button class='button' icon='Warning' plain size='default' color='#999988' text></el-button>
            </el-tooltip>
          </div>
          <div class='text' ref='refTitle'>
            {{ cardData.number1 }}
          </div>
        </div>
      </template>
      <div class='content'>
        <span style='margin-right: 6px'>{{ cardData?.title }}</span>
        <span ref='refText'>{{ nub2 }}</span>
      </div>
    </el-card>
  </div>

</template>

<script setup lang='ts'>
import { defineProps, onMounted, ref } from 'vue'


import thousandth from '@/utils/Thousandth.TS'

const refTitle = ref<InstanceType<typeof refTitle>>()
const refText = ref<InstanceType<typeof refText>>()


onMounted(() => {
  const count1 = thousandth(refTitle.value, props.nub1!)
  const count2 = thousandth(refText.value, props.nub2!)
  count1.start()
  count2.start()
})
const props = defineProps({
  cardData: {
    type: Object,
    default: {}
  },
  nub1: {
    type: Number,
    default: 0
  },
  nub2: {
    type: Number,
    default: 0
  }
})


</script>

<style scoped lang='less'>

.card {
  &:deep(.el-card) {
    padding: 0 20px;
  }

  &:deep(.el-card__header) {
    padding: 10px 0;
  }

  &:deep(.el-card__body) {
    padding: 10px 0;
  }

  .box-card {


    .title {
      font-size: 12px;
      color: #999988;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .text {
      font-size: 18px;
    }

    .content {
      font-size: 12px;
    }
  }

  .item {
    margin-bottom: 18px;
  }

}


</style>