<template>
  <view class="page-wrapper">
    <view class="page-header">
      <image class="avatar" src="../static/message.png" mode="widthFix" />
      <view class="userName">{{ info.nickName }}</view>
    </view>
    <view class="page-middle">
      <view class="middle-item" v-for="item in recordList" :key="item.label">
        <view class="middle-item-value">{{ item.value }}</view>
        <view class="middle-item-label">{{ item.label }}</view>
      </view>
    </view>
    <view class="operate-list">
      <view
        class="list-item"
        v-for="(item, i) in list"
        :key="item.title"
        @click="toSomePage(item)"
      >
        <view class="item-icon">
          <image :src="item.icon" mode="aspectFit"></image>
        </view>
        <view class="item-content border">
          <view class="item-content-title">
            {{ item.title }}
          </view>
          <view class="item-right">
            <view style="margin-right: 16rpx; color: #DADFE2" class="item-right-extra">{{ item.extra }}</view>
            <van-icon name="arrow" size="16" color="#C5C8CE" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
let recordList = ref([
  {
    label: "打卡点位",
    value: 5,
  },
  {
    label: "电子勋章",
    value: 3,
  },
  {
    label: "低碳积分",
    value: 300,
  },
]);
let list = ref([
  {
    icon: "../static/mine.png",
    route: "/user/views/my-info",
    extra: "",
    title: "个人信息",
  },
  {
    icon: "../static/password.png",
    route: "/user/views/integral-record",
    extra: "",
    title: "积分记录",
  },
  {
    icon: "../static/message.png",
    route: "/user/views/feedback",
    extra: "期待您的意见",
    title: "意见反馈",
  },
  {
    icon: "../static/account.png",
    route: "/user/views/setting",
    extra: "",
    title: "设置",
  },
]);
let messageAccount = ref(0);
let info = uni.getStorageSync("info");
let roleName = uni.getStorageSync("roleName");
console.log(info);
const toSomePage = (item: { title: string; route: string }) => {
  uni.navigateTo({
    url: item.route,
  })
};
</script>

<style scoped lang="scss">
.page-wrapper {
  width: calc(100% - 64rpx);
  height: calc(100% - 64rpx);
  padding: 32rpx;
  // display: flex;
  // flex-direction: column;
  background-color: #f1f8ff;
  // overflow: hidden;

  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 32rpx;
    .avatar {
      margin-left: 16rpx;
      margin-right: 24rpx;
      width: 120rpx;
      border-radius: 50%;
      border: 1px solid #32c5ff;
    }
    .userName {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .page-middle {
    background-color: #ffffff;
    border-radius: 4rpx;
    padding: 32rpx 52rpx;
    display: flex;
    justify-content: space-between;
    margin-bottom: 36rpx;
    .middle-item {
      // 竖向flex 并且居中对齐
      display: flex;
      flex-direction: column;
      align-items: center;
      &-value {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #3ca758;
      }
      &-label {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  .operate-list {
    height: calc(100% - 320rpx);
    background-color: #ffffff;
    border-radius: 8rpx;

    .list-item {
      display: flex;
      padding-left: 24rpx;
      align-items: center;

      .item-icon image {
        width: 32rpx;
        height: 32rpx;
      }

      .border {
        border-bottom: 1px solid #dcdee2;
      }

      .item-content {
        flex: 1;
        margin-left: 20rpx;
        margin-right: 8rpx;
        display: flex;
        align-items: center;
        padding-right: 24rpx;

        .item-content-title {
          flex: 1;
          padding-left: 12rpx;
          font-size: 14px;
          font-weight: 400;
          color: #17233d;
          line-height: 100rpx;
        }

        .item-right {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #c5c8ce;
        }
      }
    }
  }
}
</style>