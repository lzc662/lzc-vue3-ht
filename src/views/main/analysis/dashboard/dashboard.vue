<template>
  <div class='dashboard'>
    <!--  商品销量 card-->
    <el-row :gutter='20'>
      <template v-for='item in goodList' :key='item.id'>
        <el-col :span='6'>
          <div class='card'>
            <card :cardData='item' :nub1='item.number1' :nub2='item.number2' />
          </div>
        </el-col>
      </template>
    </el-row>

    <!--    商品数量-->
    <el-row style='margin-top:20px' :gutter='20'>
      <el-col :span='7'>
        <card2 title='分类商品数量(饼图)' :cardData='goodsNumber'></card2>
      </el-col>
      <el-col :span='10'>
        <card3 title='不同城市商品销量' :cardData='citySales'></card3>
      </el-col>
      <el-col :span='7'>
        <card4 title='分类商品数量(玫瑰图)' :cardData='goodsNumberRose'></card4>
      </el-col>
    </el-row>
    <el-row style='margin-top:20px' :gutter='20'>
      <el-col :span='12'>
        <card5 title='分类商品的销量' :cardData='goodsSales'></card5>
      </el-col>
      <el-col :span='12'>
        <card6 title='分类商品的收藏' :cardData='goodsFavor'></card6>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
// 组件引入
import card from '@/components/main/analysis/DashboardCard.vue'
import card2 from '@/components/main/analysis/DashboardCard2.vue'
import card3 from '@/components/main/analysis/DashboardCard3.vue'
import card4 from '@/components/main/analysis/DashboardCard4.vue'

import card5 from '@/components/main/analysis/DashboardCard5.vue'
import card6 from '@/components/main/analysis/DashboardCard6.vue'

// vue工具引入
import { storeToRefs } from 'pinia'

// 引入store
import { userDashboardStore } from '@/stores/main/analysis/dashboard'
import { computed } from 'vue'

const { getGoodsList } = userDashboardStore()
const { goodList, goodsNumber, citySales, goodsNumberRose, goodsSales, goodsFavor } = storeToRefs(userDashboardStore())


//获取商品销量
getGoodsList()


</script>

<style scoped lang='less'>
.card {


  &:deep(.el-button ) {
    padding: 0;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
  }

}

</style>