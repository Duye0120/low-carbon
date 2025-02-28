<template>
  <view class="page-content">
    <view class="user-info">
      <view class="avatar-wrapper">
        <image
          class="avatar"
          :src="info ? info.avatar : '/static/avatar.png'"
          mode="aspectFill"
        ></image>
      </view>
      <view class="user-details">
        <view class="username">{{ info ? info.name : "游客" }}</view>
        <view class="points">积分 304</view>
      </view>
    </view>
    <view class="page-content-map">
      <image src="/static/homePage.png" mode="widthFix"></image>
    </view>
    <view class="page-content-menu">
      <view class="page-content-menu-top">
        <view
          @click="navigatorTo('每日任务')"
          class="page-content-menu-top-afterBoard"
          >每日任务</view
        >
        <view @click="navigatorTo('场景切换')">场景切换</view>
      </view>
      <view class="page-content-menu-bottom">
        <view
          @click="navigatorTo('个人中心')"
          class="page-content-menu-top-afterBoard"
          >个人中心</view
        >
        <view
          @click="navigatorTo('我的勋章')"
          class="page-content-menu-top-afterBoard"
          >我的勋章</view
        >
        <view
          @click="navigatorTo('积分规则')"
          class="page-content-menu-top-afterBoard"
          >积分规则</view
        >
        <view @click="navigatorTo('资讯中心')">资讯中心</view>
      </view>
    </view>
    <van-popup
      :show="popupVisible"
      closeable
      round
      position="bottom"
      custom-style="height: 80%; overflow:visible;border-radius: 40rpx 40rpx 0rpx 0rpx;"
      @close="closePopup"
    >
      <view class="popup-content">
        <view class="popup-title">场景切换</view>
        <view class="popup-scene">
          <SceneContent type="popup" v-on:close-popup="closePopup" />
        </view>
      </view>
    </van-popup>

    <!-- 签到弹窗组件 -->
    <SignInOverlay
      v-model:show="showSignInOverlay"
      @close="handleCloseSignIn"
      @sign-in="handleSignIn"
    />
    <!-- 模态弹窗 -->
    <van-popup ref="popupRef" position="bottom" round :show="false">
      <view> 获取您的昵称和头像 </view>
      <view> 在"个人中心"页面中展示昵称和头像 </view>
      <view>
        头像
        <image class="avatar" src="/static/avatar.png" />
      </view>
      <view
        >昵称
        <input type="nickname" class="weui-input" placeholder="请输入昵称" />
      </view>
    </van-popup>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref, onMounted, onUnmounted } from "vue";
import SignInOverlay from "../components/SignInOverlay.vue";
import SceneContent from "../components/SceneContent.vue";

const title = ref("Hello");
// 控制签到弹窗显示
const showSignInOverlay = ref(false);
const popupVisible = ref(false);

// 页面加载时显示签到弹窗
onMounted(() => {
  // 检查是否已经签到，如果没有则显示弹窗
  checkSignInStatus();
});

// onUnmounted(() => {
//   uni.removeStorageSync('lastSignInDate')
// })

// 检查签到状态
const checkSignInStatus = () => {
  // 这里可以添加检查本地存储或API调用来判断用户今天是否已经签到
  // 示例：简单使用本地存储判断
  const today = new Date().toDateString();
  const lastSignInDate = uni.getStorageSync("lastSignInDate");

  if (lastSignInDate !== today) {
    // 今天还没有签到，显示弹窗
    showSignInOverlay.value = false;
  }
};

// 处理签到
const handleSignIn = (day: number) => {
  console.log("用户已签到", day, "天");
  // 记录签到日期
  const today = new Date().toDateString();
  uni.setStorageSync("lastSignInDate", today);
  // 这里可以添加其他签到后的逻辑，如积分增加等
};

// 处理关闭签到弹窗
const handleCloseSignIn = () => {
  showSignInOverlay.value = false;
};

const navigatorTo = (item: string) => {
  console.log(item);
  switch (item) {
    case "每日任务":
      showSignInOverlay.value = true;
      break;
    case "场景切换":
      showPopup();
      break;
    case "排行榜":
      uni.navigateTo({ url: `/main/index?tab=ranking` });
      break;
    case "个人中心":
      uni.navigateTo({ url: `/user/views/index` });
      break;
    case "我的勋章":
      uni.navigateTo({ url: `/medal/views/index` });
      break;
    case "积分规则":
      uni.navigateTo({ url: `/integral/index` });
      break;
    case "资讯中心":
      uni.navigateTo({ url: `/news/views/index` });
      break;
  }
};
let info = ref<any>(null);
onShow(() => {
  uni.login({
    provider: "weixin",
    success: function (loginRes) {
      console.log(loginRes, 111);
    },
  });
});

const showPopup = () => {
  console.log("showPopup");
  popupVisible.value = true;
};
const closePopup = () => {
  console.log("closePopup");
  popupVisible.value = false;
};
</script>

<style scoped lang="scss">
.page-content {
  height: 100%;
  width: 100%;
  background-color: #a0deab;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  &-map {
    width: 100%;
    > image {
      width: 100%;
    }
  }
  &-menu {
    padding: 22rpx 44rpx 40rpx 44rpx;
    height: 196rpx;
    width: calc(100% - 88rpx);
    &-top {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      border-top: 1px solid rgba(0, 0, 0, 0.45);
      border-bottom: 1px solid rgba(0, 0, 0, 0.45);
      height: 124rpx;
      text-align: center;
      line-height: 124rpx;
      &-afterBoard {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          right: 0; /* 定位到右侧 */
          top: 50%; /* 垂直居中 */
          transform: translateY(-50%); /* 微调居中位置 */
          width: 1px; /* 边框粗细 */
          height: 50%; /* 边框高度为父元素的 50% */
          background: rgba(0, 0, 0, 0.45); /* 边框颜色 */
        }
      }
    }
    &-bottom {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-bottom: 1px solid rgba(0, 0, 0, 0.45);
      height: 70rpx;
      text-align: center;
      line-height: 70rpx;
    }
  }
}
.user-info {
  position: absolute;
  top: 160rpx;
  left: 32rpx;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: rgba(255, 255, 255, 0.8); */
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
}

.avatar-wrapper {
  width: 102rpx;
  height: 102rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10rpx;
  background-color: #fff;
  position: absolute;
  left: 0;
}

.avatar {
  width: 100%;
  height: 100%;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  height: 90rpx;
  width: fit-content;
  padding: 0 35rpx 0 100rpx;
  border-radius: 45rpx;
}

.username {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 4rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
}

.points {
  font-size: 24rpx;
  color: #38b868;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
}
.popup-content {
  padding: 80rpx 20rpx 20rpx 20rpx;
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(
    180deg,
    #93dea6 0%,
    #d8eede 14%,
    #f4f5f4 22%,
    #f5f5f5 100%
  );
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  box-sizing: border-box;
}
.popup-title {
  font-size: 32rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #016629;
  width: 370rpx;
  height: 76rpx;
  position: absolute;
  top: -38rpx;
  left: 50%;
  transform: translateX(-50%);
  background-image: url("../static/popup-change-scene.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999999999;
}

.popup-scene {
  width: 100%;
  height: 100%;
}
</style>
