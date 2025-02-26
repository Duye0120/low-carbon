<template>
  <view class="ranking-container">
    <!-- 前三名用户 -->
    <view class="top-users">
      <view v-for="(user, index) in top3Users" :key="index" class="top-user-card" :class="`rank-${index + 1}`">
        <view class="rank-number">{{ index + 1 }}</view>
        <view class="user-avatar">
          <image src="/static/avatar.png" mode="aspectFill"></image>
        </view>
        <view class="user-name">用户名称</view>
        <view class="user-points">{{ user.points }}</view>
      </view>
    </view>

    <!-- 用户排名列表 -->
    <view class="user-rank-list">
      <view v-for="(user, index) in otherUsers" :key="index" class="rank-item">
        <view class="rank-number">{{ index + 4 }}</view>
        <view class="user-avatar">
          <image src="/static/avatar.png" mode="aspectFill"></image>
        </view>
        <view class="user-info">
          <view class="user-name">用户名称</view>
        </view>
        <view class="user-points">{{ user.points }}零碳积分</view>
      </view>
    </view>
    <!-- 添加底部间距，防止内容被遮挡 -->
    <view class="bottom-spacing"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 前三名用户数据
const top3Users = ref([
  { id: 1, name: '用户名称', points: 400 },
  { id: 2, name: '用户名称', points: 400 },
  { id: 3, name: '用户名称', points: 400 },
]);

// 其他用户数据
const otherUsers = ref([
  { id: 4, name: '用户名称', points: 400 },
  { id: 5, name: '用户名称', points: 400 },
  { id: 6, name: '用户名称', points: 400 },
  { id: 7, name: '用户名称', points: 400 },
  { id: 8, name: '用户名称', points: 400 },
  { id: 9, name: '用户名称', points: 400 },
]);
</script>

<style scoped>
.ranking-container {
  padding: 20rpx 0;
}

.top-users {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30rpx;
}

.top-user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  position: relative;
  width: 180rpx;
}

.rank-number {
  position: absolute;
  top: -10rpx;
  left: -10rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: #ff5722;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
}

.rank-1 .rank-number {
  background-color: #FFD700;
}

.rank-2 .rank-number {
  background-color: #C0C0C0;
}

.rank-3 .rank-number {
  background-color: #CD7F32;
}

.user-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10rpx;
}

.user-avatar image {
  width: 100%;
  height: 100%;
}

.user-name {
  font-size: 24rpx;
  color: #333;
  margin-bottom: 5rpx;
}

.user-points {
  font-size: 22rpx;
  color: #4CAF50;
}

.user-rank-list {
  background-color: #fff;
  border-radius: 10rpx;
}

.rank-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1px solid #f0f0f0;
}

.rank-item .rank-number {
  position: static;
  width: 40rpx;
  height: 40rpx;
  background-color: #9e9e9e;
  margin-right: 20rpx;
}

.rank-item .user-avatar {
  margin-right: 20rpx;
  margin-bottom: 0;
}

.rank-item .user-info {
  flex: 1;
}

.rank-item .user-points {
  font-size: 26rpx;
}

.bottom-spacing {
  height: 40rpx;
  /* 添加底部间距，防止最后一个元素被遮挡 */
}
</style>
