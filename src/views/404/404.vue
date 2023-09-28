<template>
  <div class='404'>
    <h2>404</h2>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'

const router = useRouter()

setTimeout(() => {
  router.push('/main')
}, 2000)
</script>

<style scoped lang='less'>

</style>