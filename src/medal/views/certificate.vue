<template>
  <view class="page-wrapper">
    <view class="page-wrapper-entityList">
      <view
        class="page-wrapper-entityList-item"
        v-for="item in entityList"
        :key="item.name"
      >
        <image src="../static/entityMedal.png" mode="widthFix"></image>
        <view class="page-wrapper-entityList-item-content">
          <view class="page-wrapper-entityList-item-content-title"
            >{{ item.name }}（可至线下领取）</view
          >
          <view class="page-wrapper-entityList-item-content-describe">{{
            item.describe
          }}</view>
          <view class="page-wrapper-entityList-item-content-exchange">
            <view class="exchange-left">
              <view class="exchange-left-number">*{{ item.cost }}</view>
            </view>
            <view class="exchange-right">
              <button
                :class="{
                  'submit-button': !item.hasUsed,
                  'submit-button-disabled': item.hasUsed,
                }"
                type="button"
                plain
              >
                {{ item.hasUsed ? "已使用" : "待使用" }}
              </button></view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let entityList = ref([
  {
    name: "XX勋章兑换券",
    describe: "可至XX处领取实物勋章",
    cost: 1,
    hasUsed: false,
  },
  {
    name: "XX勋章兑换券",
    describe: "可至XX处领取实物勋章",
    cost: 1,
    hasUsed: true,
  },
  {
    name: "XX勋章兑换券",
    describe: "可至XX处领取实物勋章",
    cost: 1,
    hasUsed: true,
  },
  {
    name: "XX勋章兑换券",
    describe: "可至XX处领取实物勋章",
    cost: 1,
    hasUsed: true,
  },
]);
</script>

<style scoped lang="scss">
.page-wrapper {
  width: calc(100% - 64rpx);
  min-height: calc(100% - 64rpx);
  padding: 32rpx;
  background: #f1f8ff;
  &-entityList {
    display: grid;
    grid-gap: 16rpx;
    &-item {
      width: calc(100% - 48rpx);
      height: 208rpx;
      background: #ffffff;
      display: flex;
      padding: 24rpx;
      align-items: center;
      > image {
        width: 160rpx;
      }
      &-content {
        width: calc(100% - 160rpx);
        height: calc(100% - 48rpx);
        padding-left: 20rpx;
        padding-right: 10rpx;
        &-title {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.85);
        }
        &-describe {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0, 0, 0, 0.65);
          margin-top: 8rpx;
        }
        &-exchange {
          display: flex;
          justify-content: space-between;
          margin-top: 28rpx;
          align-items: baseline;
          .exchange-left {
            display: flex;
            align-items: baseline;
            &-number {
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 36rpx;
              color: #06ac44;
            }
            &-name {
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 24rpx;
              color: rgba(0, 0, 0, 0.65);
            }
          }
          .exchange-right {
            .submit-button {
              width: 100%;
              height: 56rpx;
              border-radius: 8rpx;
              color: #ffffff;
              line-height: 56rpx;
              background-color: #3bb872;
              border: none;
            }

            .submit-button-disabled {
              width: 100%;
              height: 56rpx;
              border-radius: 8rpx;
              color: rgba(0, 0, 0, 0.25);
              line-height: 56rpx;
              background-color: #d9d9d9;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
