import { CountUp } from 'countup.js'

// 展示数字动画
export default function thousandth(item: any, nub: number) {
  return new CountUp(item, nub, {
    startVal: 0
  })
}