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
    <view class="user-rank-list-wrapper">
      <view class="user-rank-list-header"></view>
      <view class="user-rank-list">
        <view
          v-for="(user, index) in otherUsers"
          :key="index"
          class="rank-item"
        >
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
    </view>
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

<style scoped lang="scss">
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
  margin-bottom: 24rpx;
}

.top-user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10rpx;
  box-sizing: border-box;
  height: 100%;
}

/* .rank-number {
  position: absolute;
  top: -10rpx;
  left: -10rpx;
  width: 40rpx;
  height: 40rpx;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
} */

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

.rank-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1px solid #f0f0f0;
  .rank-number {
    position: static;
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.85);
    letter-spacing: 1px;
  }
  .user-avatar {
    margin-right: 20rpx;
    margin-bottom: 0;
    width: 86rpx;
    height: 86rpx;
    border-radius: 50%;
    background-color: #47A04D;
  }
  .user-info {
    flex: 1;
    .user-name {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .user-points {
    font-size: 28rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #4caf50;
  }
}

.user-rank-list-wrapper {
  position: relative;
  padding: 22rpx 26rpx;
  box-sizing: border-box;

  .user-rank-list-header {
    box-sizing: border-box;
    height: 44rpx;
    width: 100%;
    border: 12rpx solid #a0deab;
    background-color: #368544;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 26rpx;
    z-index: 1;
  }
  .user-rank-list {
    position: inherit;
    background-color: #fff;
    border-radius: 0rpx 0rpx 8rpx 8rpx;
    z-index: 10;
    box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.15);
  }
}
</style>
