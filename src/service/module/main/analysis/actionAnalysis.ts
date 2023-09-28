import lzcRequest from '@/service'

//获取商品统计数量
export function fetchGoodslist() {
  return lzcRequest.get({
    url: '/goods/amount/list'
  })
}

//每个分类商品个数
export function fetchEveryGoodsNumber() {
  return lzcRequest.get({
    url: '/goods/category/count'
  })
}

//不同城市销量
export function fetchcitySales() {
  return lzcRequest.get({
    url: '/goods/address/sale'
  })
}

// 分类商品销量
export function fetchClassificationGoodsSales() {
  return lzcRequest.get({
    url: '/goods/category/sale'
  })
}

//分类商品收藏
export function fetchClassificationGoodsFavor() {
  return lzcRequest.get({
    url: '/goods/category/favor'
  })
}