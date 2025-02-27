<template>
  <view class="ranking-container">
    <!-- 前三名用户 -->
    <view class="top-users">
      <RankingTop3
        class="top-user-card"
        v-for="(user, index) in top3Users"
        :key="`$rank-item-${index}`"
        :rank="user?.rank ?? 0"
        :avatar="user?.avatar ?? ''"
        :userName="user?.userName ?? ''"
        :points="user?.points ?? 0"
      />
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
import { ref } from "vue";
import RankingTop3 from "../RankingTop3.vue";
import { IPropsType } from "../type.d";
// 前三名用户数据
const top3Users = ref<Array<Partial<IPropsType>>>([
  { key: "2", userName: "用户名称2", points: 400, avatar: "", rank: 2 },
  { key: "1", userName: "用户名称1", points: 400, avatar: "", rank: 1 },
  { key: "3", userName: "用户名称3", points: 400, avatar: "", rank: 3 },
]);

// 其他用户数据
const otherUsers = ref([
  { key: "4", userName: "用户名称", points: 400 },
  { key: "5", userName: "用户名称", points: 400 },
  { key: "6", userName: "用户名称", points: 400 },
  { key: "7", userName: "用户名称", points: 400 },
  { key: "8", userName: "用户名称", points: 400 },
  { key: "9", userName: "用户名称", points: 400 },
]);
</script>

<style scoped>
.ranking-container {
  padding: 24rpx;
}

.top-users {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* gap: 10rpx; */
  /* margin-bottom: 30rpx; */
  background: url("../../static/ranking/top3-bg-img.svg") no-repeat;
  background-size: cover;
  background-color: transparent;
  /* box-shadow: 0 2rpx 4rpx 0 rgba(0, 0, 0, 0.22); */
  border-radius: 8rpx;
  overflow: hidden;
  height: 320rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx 8rpx 0;
}

.top-user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10rpx;
  box-sizing: border-box;
  height: 100%;
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
  background-color: #ffd700;
}

.rank-2 .rank-number {
  background-color: #c0c0c0;
}

.rank-3 .rank-number {
  background-color: #cd7f32;
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
  color: #4caf50;
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
