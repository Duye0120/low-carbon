<template>
  <view class="page-wrapper">
    <view class="page-header">
      <image class="avatar" src="../static/message.png" mode="widthFix"/>
    </view>
    <view class="page-middle"> </view>
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
        <view class="item-content" :class="{ border: i != 0 }">
          <view class="item-content-title">
            {{ item.title }}
          </view>
          <view class="item-right">
            <uni-icons type="arrowright" size="16" color="#C5C8CE"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

let list = ref([
  {
    icon: "../static/mine.png",
    title: "个人信息",
  },
  {
    icon: "../static/password.png",
    title: "积分记录",
  },
  {
    icon: "../static/message.png",
    title: "意见反馈",
  },
  {
    icon: "../static/account.png",
    title: "设置",
  },
]);
let messageAccount = ref(0);
let info = uni.getStorageSync("info");
let roleName = uni.getStorageSync("roleName");
console.log(info);
const toSomePage = (item: { title: string }) => {
  let title = item.title;
  if (title == "修改密码") {
    uni.navigateTo({
      url: "updatePassword",
    });
  } else if (title == "账号管理") {
    uni.navigateTo({
      url: "accountManage",
    });
  } else if (title == "个人信息") {
    uni.navigateTo({
      url: "detail",
    });
  } else if (title == "通知公告") {
    uni.navigateTo({
      url: "../notice/index",
    });
  } else if (title == "关于我们") {
    uni.navigateTo({
      url: "aboutUs",
    });
  }
};

const goToMessage = () => {
  uni.navigateTo({
    url: "/pages/index/message",
  });
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
    .avatar {
      width: 120rpx;
      border-radius: 50%;
      border: 1px solid #32C5FF;
    }
  }

  .operate-list {
    background-color: #ffffff;
    border-radius: 8rpx;

    .list-item {
      display: flex;
      padding-left: 48rpx;
      align-items: center;

      .item-icon image {
        width: 32rpx;
        height: 32rpx;
      }

      .border {
        border-top: 1px solid #dcdee2;
      }

      .item-content {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        align-items: center;
        padding-right: 48rpx;

        .item-content-title {
          flex: 1;
          padding-left: 12rpx;
          font-size: 14px;
          font-weight: 400;
          color: #17233d;
          line-height: 100rpx;
        }

        .item-right {
          font-size: 14px;
          color: #c5c8ce;
        }
      }
    }
  }
}
</style>
