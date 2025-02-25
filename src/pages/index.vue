<template>
  <view class="page-content">
    <view @click="navigatorTo('每日任务')">每日任务</view>
    <view @click="navigatorTo('场景切换')">场景切换</view>
    <view @click="navigatorTo('个人中心')">个人中心</view>
    <view @click="navigatorTo('我的勋章')">我的勋章</view>
    <view @click="navigatorTo('积分规则')">积分规则</view>
    <view @click="navigatorTo('资讯中心')">资讯中心</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
const navigatorTo = (item: string) => {
  console.log(item)
  switch(item) {
    case '每日任务':
      uni.navigateTo({ url: `/pages/task/index` })
      break
    case '场景切换':
      uni.navigateTo({ url: `/pages/scene/index` })
      break
    case '个人中心':
      uni.navigateTo({ url: `/user/views/index` })
      break
    case '我的勋章':
      uni.navigateTo({ url: `/pages/medal/index` })
      break
    case '积分规则':
      uni.navigateTo({ url: `/pages/integral/index` })
      break
    case '资讯中心':
      uni.navigateTo({ url: `/news/views/index` })
      break
  }
}
</script>

<style>
.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
