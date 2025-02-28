<template>
  <view class="page-content">
    <view class="title">低碳生活</view>
    <view class="button-group">
      <view class="button" @click="showPopup">场景切换</view>
      <view class="button" @click="navigatorTo('每日任务')">每日任务</view>
      <view class="button" @click="navigatorTo('个人中心')">个人中心</view>
      <view class="button" @click="navigatorTo('我的勋章')">我的勋章</view>
      <view class="button" @click="navigatorTo('积分规则')">积分规则</view>
      <view class="button" @click="navigatorTo('资讯中心')">资讯中心</view>
    </view>
    <!-- <van-overlay :show="true"/> -->
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
      uni.navigateTo({ url: `/main/index?tab=task` });
      break;
    case "场景切换":
      uni.navigateTo({ url: `/main/index?tab=scene` });
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

onShow(() => {
  uni.login({
    provider: "weixin",
    success: function (loginRes) {
      console.log(loginRes);
      // 获取用户信息
      uni.getUserInfo({
        provider: "weixin",
        success: function (infoRes) {
          console.log(infoRes);
          console.log("用户昵称为：" + infoRes.userInfo.nickName);
          uni.setStorageSync("info", infoRes.userInfo);
        },
      });
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

<style>
.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 60rpx;
  color: #4caf50;
}

.button-group {
  width: 100%;
}

.button {
  width: 100%;
  height: 100rpx;
  background-color: #4caf50;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
  margin-bottom: 30rpx;
  font-size: 32rpx;
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
