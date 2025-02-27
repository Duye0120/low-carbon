<template>
  <view class="page-wrapper">
    <view
      class="page-wrapper-item"
      v-for="(item, index) in integralRecordList"
      :key="index"
    >
      <view class="page-wrapper-item-top">
        <view class="page-wrapper-item-top-label">{{ item.label }}</view>
        <view class="page-wrapper-item-top-activeIntegral">{{
          item.activeIntegral
        }}</view>
      </view>
      <view class="page-wrapper-item-bottom">
        <view class="page-wrapper-item-bottom-createTime">{{
          item.createTime
        }}</view>
        <view class="page-wrapper-item-bottom-surplusIntegral">剩余零碳积分&nbsp;{{
          item.surplusIntegral
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let integralRecordList = ref([
  {
    label: "兑换勋章",
    activeIntegral: "-100",
    surplusIntegral: "100",
    createTime: "2025.02.17 10:00",
  },
  {
    label: "获得积分奖励",
    activeIntegral: "+10",
    surplusIntegral: "300",
    createTime: "2025.02.17 09:59",
  },
  {
    label: "获得积分奖励",
    activeIntegral: "+10",
    surplusIntegral: "290",
    createTime: "2025.02.17 09:55",
  },
  {
    label: "完成每日签到",
    activeIntegral: "+30",
    surplusIntegral: "280",
    createTime: "2025.02.17 09:50",
  },
]);
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  &-item {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    border-bottom: 1px solid #e9e9e9;
    &-top {
      display: flex;
      justify-content: space-between;
      &-label {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.65);
      }
      &-activeIntegral {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 10rpx;
      &-surplusIntegral {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 26rpx;
        color: rgba(0, 0, 0, 0.45);
      }
      &-createTime {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 26rpx;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>
