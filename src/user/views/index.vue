<template>
  <view class="page-wrapper">
    <view class="page-header">
      <view class="header-content">
        <view class="content-left">
          <!-- <u-avatar :size="64" :src="info.avatar"></u-avatar> -->
          <image :src="info.avatar" mode="widthFix"></image>
        </view>
        <view class="content-center">
          <view class="top">
            {{ info.name }}
          </view>
          <view class="bottom">
            {{ roleName }}
          </view>
        </view>
        <view @tap="goToMessage" class="content-arrow">
          <image
            style="width: 44rpx"
            mode="widthFix"
            src="/static/user/message.png"
            alt=""
          />
          <u-badge
            style="top: -16rpx; left: 16rpx; position: absolute"
            type="error"
            max="99"
            :value="messageAccount"
          ></u-badge>
        </view>
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
    icon: "../assets/mine.png",
    title: "个人信息",
  },
  {
    icon: "../assets/password.png",
    title: "积分记录",
  },
  {
    icon: "../assets/message.png",
    title: "意见反馈",
  },
  {
    icon: "../assets/account.png",
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
image {
  display: block;
}

view {
  box-sizing: border-box;
}

.page-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f5f7;
  overflow: hidden;

  .page-header {
    position: relative;

    image {
      width: 100%;
    }

    .header-content {
      padding: 0 48rpx;
      position: absolute;
      bottom: 40rpx;
      display: flex;
      align-items: center;
      width: 100%;

      .content-left image {
        width: 104rpx;
      }

      .content-center {
        color: #ffffff;
        margin-left: 32rpx;
        font-weight: 400;

        .top {
          font-size: 16px;
        }

        .bottom {
          font-size: 14px;
          margin-top: 10rpx;
        }
      }

      .content-arrow {
        position: absolute;
        right: 36rpx;
        top: -40rpx;
      }
    }
  }

  .operate-list {
    margin: 24rpx;
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

  .button-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 160rpx;

    .button {
      margin: 0 auto;
      height: 72rpx;
      line-height: 72rpx;
      font-size: 32rpx;
      border-radius: 36rpx;
      color: #ffffff;
      width: 74%;
      background: #5476fd;
    }
  }
}
</style>
