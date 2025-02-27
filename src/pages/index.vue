<template>
  <view class="page-content">
    <view class="title">低碳生活</view>
    <view class="button-group">
      <view class="button" @click="navigatorTo('场景切换')">场景切换</view>
      <view class="button" @click="navigatorTo('每日任务')">每日任务</view>
      <view class="button" @click="navigatorTo('排行榜')">排行榜</view>
      <view class="button" @click="navigatorTo('个人中心')">个人中心</view>
      <view class="button" @click="navigatorTo('资讯中心')">资讯中心</view>
    </view>
	<!-- <van-overlay :show="true"/> -->
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
const navigatorTo = (item: string) => {
  console.log(item)
  switch (item) {
    case '每日任务':
      uni.navigateTo({ url: `/main/index?tab=task` })
      break
    case '场景切换':
      uni.navigateTo({ url: `/main/index?tab=scene` })
      break
    case '排行榜':
      uni.navigateTo({ url: `/main/index?tab=ranking` })
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
  padding: 40rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 60rpx;
  color: #4CAF50;
}

.button-group {
  width: 100%;
}

.button {
  width: 100%;
  height: 100rpx;
  background-color: #4CAF50;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
  margin-bottom: 30rpx;
  font-size: 32rpx;
}
</style>
