<template>
  <view class="common-header">
    <!-- 用户信息 -->
    <view class="user-info">
      <view class="avatar-wrapper">
        <image class="avatar" src="/static/avatar.png" mode="aspectFill"></image>
      </view>
      <view class="user-details">
        <view class="username">游客250221</view>
        <view class="points">积分 304</view>
      </view>
    </view>

    <!-- Banner图像 -->
    <view class="banner">
      <image class="banner-image" src="/static/banner.png" mode="widthFix"></image>
    </view>
  </view>
</template>

<script setup lang="ts">
// 如果需要可以添加更多动态功能
</script>

<style scoped>
.common-header {
  width: 100%;
  position: relative;
}

.banner {
  width: 100%;
}

.banner-image {
  width: 100%;
  display: block;
}

.user-info {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  z-index: 10;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
}

.avatar-wrapper {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10rpx;
}

.avatar {
  width: 100%;
  height: 100%;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 26rpx;
  color: #333;
}

.points {
  font-size: 22rpx;
  color: #4CAF50;
}
</style>
