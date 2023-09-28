import { defineStore } from 'pinia'
import {
  fetchGoodslist,
  fetchEveryGoodsNumber,
  fetchcitySales,
  fetchClassificationGoodsSales,
  fetchClassificationGoodsFavor
} from '@/service/module/main/analysis/actionAnalysis'
import { reactive, ref } from 'vue'

export const userDashboardStore = defineStore('dashboard', () => {


  const goodList = reactive([])    // 商品统计数量
  const goodsNumber = reactive([]) // 每个分类商品个数
  const citySales = reactive([])   // 不同城市销量
  const goodsNumberRose = reactive([]) // 每个分类商品个数

  const goodsSales = reactive([])  // 分类商品销量
  const goodsFavor = reactive([])  // 分类商品收藏


  // 获取商品统计数量
  //获取商品统计数量
  //每个分类商品个数
  //不同城市销量
  // 分类商品销量
  async function getGoodsList() {

    const res1 = await fetchGoodslist() // 商品统计数量
    const res2 = await fetchEveryGoodsNumber()//每个分类商品个数
    const res3 = await fetchcitySales()  //不同城市销量
    const res4 = await fetchClassificationGoodsSales()  // 分类商品销量
    const res5 = await fetchClassificationGoodsFavor() // 分类商品收藏
    // console.log('res3', res3.data)


    //清空数组
    goodList.splice(0, goodList.length)
    goodsNumber.splice(0, goodsNumber.length)
    goodsNumberRose.splice(0, goodsNumber.length)
    citySales.splice(0, citySales.length)
    goodsSales.splice(0, goodsSales.length)
    goodsFavor.splice(0, goodsFavor.length)

    // 赋值给变量
    goodList.push(...res1.data)
    goodsNumber.push(...res2.data)
    goodsNumberRose.push(...res2.data)
    citySales.push(...res3.data)
    goodsSales.push(...res4.data)
    goodsFavor.push(...res5.data)
  }


  return { goodList, getGoodsList, goodsNumber, citySales, goodsSales, goodsFavor, goodsNumberRose }
})