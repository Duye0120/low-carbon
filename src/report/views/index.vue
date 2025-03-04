<template>
  <view class="page-wrapper">
    <view class="page-wrapper-header">
      <image
        src="../static/report.png"
        style="width: 100%"
        mode="widthFix"
        alt=""
      />
    </view>
    <view class="page-wrapper-content">
      <view class="title">数据报告</view>
      <view class="describe"
        >本次行程，您参与了xxx、xxx…，共计减碳xxx，相当于种了xxx棵xx树，感谢您为低碳生活做出的贡献。</view
      >
      <view class="complete-data">
        <view class="complete-data-item">
          <view class="complete-data-item-name">打卡点位</view>
          <view class="complete-data-item-value">5</view>
        </view>
        <view class="complete-data-item">
          <view class="complete-data-item-name">完成任务</view>
          <view class="complete-data-item-value">9</view>
        </view>
        <view class="complete-data-item">
          <view class="complete-data-item-name">零碳积分</view>
          <view class="complete-data-item-value">50</view>
        </view>
      </view>
      <view class="statistics">减碳量统计</view>
      <scroll-view
        class="statistics-content"
        :show-scrollbar="false"
        scroll-y="true"
      >
        <view class="statistics-content-item">
          <view class="statistics-content-item-left">乘坐氢能交通工具</view>
          <view class="statistics-content-item-right">20零碳积分</view>
        </view>
        <view class="statistics-content-item">
          <view class="statistics-content-item-left">乘坐氢能交通工具</view>
          <view class="statistics-content-item-right">20零碳积分</view>
        </view>
        <view class="statistics-content-item">
          <view class="statistics-content-item-left">乘坐氢能交通工具</view>
          <view class="statistics-content-item-right">20零碳积分</view>
        </view>
        <view class="statistics-content-item">
          <view class="statistics-content-item-left">乘坐氢能交通工具</view>
          <view class="statistics-content-item-right">20零碳积分</view>
        </view>
        <view class="statistics-content-item">
          <view class="statistics-content-item-left">乘坐氢能交通工具</view>
          <view class="statistics-content-item-right">20零碳积分</view>
        </view>
      </scroll-view>
    </view>
    <button class="share-button" type="button" open-type="share" plain>
      <image
        src="../static/share.png"
        mode="widthFix"
        style="width: 56rpx"
      ></image
      >分享报告到微信
    </button>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const onShareAppMessage = () => {
  return {
    title: "分享标题",
    path: "/pages/views/index",
  };
};
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    width: 100%;
    flex-shrink: 0; /* 禁止头部压缩 */
    margin-bottom: -40rpx;
    z-index: 1;
  }
  &-content {
    z-index: 2;
    padding: 32rpx;
    flex: 1;
    overflow-y: auto;
    background-color: #f1f8ff;
    -webkit-overflow-scrolling: touch; /* 启用弹性滚动（iOS优化） */
    box-sizing: border-box; /* 防止padding影响高度计算 */
    .title {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
    }
    .describe {
      margin-top: 16rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.65);
    }
    .complete-data {
      margin-top: 32rpx;
      margin-bottom: 48rpx;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 100rpx;
      &-item {
        &-name {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.45);
        }
        &-value {
          font-family: FZDHTJW--GB1, FZDHTJW--GB1;
          font-weight: normal;
          font-size: 44rpx;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
    .statistics {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 18rpx;
    }
    .statistics-content {
      .statistics-content-item:not(:last-child) {
        margin-bottom: 16rpx;
      }
      .statistics-content-item {
        width: calc(100% - 64rpx);
        padding: 24rpx 32rpx;
        background: #ffffff;
        display: flex;
        justify-content: space-between;
        &-left {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.85);
        }
        &-right {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
  }

  .share-button {
    position: fixed;
    width: 80%;
    margin: 0rpx 76rpx;
    border: none;
    bottom: 50rpx;
    z-index: 100;
    height: 109rpx;
    background: #6ec58a;
    box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
    border-radius: 52rpx;
    display: flex;
    align-items: center;
    color: #fff;
    justify-content: center;
  }
}
</style>
