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
    
    <!-- 签到弹窗组件 -->
    <SignInOverlay 
      v-model:show="showSignInOverlay" 
      @close="handleCloseSignIn"
      @sign-in="handleSignIn"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SignInOverlay from './components/SignInOverlay.vue'

const title = ref('Hello')
// 控制签到弹窗显示
const showSignInOverlay = ref(false)

// 页面加载时显示签到弹窗
onMounted(() => {
  // 检查是否已经签到，如果没有则显示弹窗
  checkSignInStatus()
})

// onUnmounted(() => {
//   uni.removeStorageSync('lastSignInDate')
// })
  

// 检查签到状态
const checkSignInStatus = () => {
  // 这里可以添加检查本地存储或API调用来判断用户今天是否已经签到
  // 示例：简单使用本地存储判断
  const today = new Date().toDateString()
  const lastSignInDate = uni.getStorageSync('lastSignInDate')
  
  if (lastSignInDate !== today) {
    // 今天还没有签到，显示弹窗
    showSignInOverlay.value = true
  }
}

// 处理签到
const handleSignIn = (day: number) => {
  console.log('用户已签到', day, '天')
  // 记录签到日期
  const today = new Date().toDateString()
  uni.setStorageSync('lastSignInDate', today)
  // 这里可以添加其他签到后的逻辑，如积分增加等
}

// 处理关闭签到弹窗
const handleCloseSignIn = () => {
  showSignInOverlay.value = false
}

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
