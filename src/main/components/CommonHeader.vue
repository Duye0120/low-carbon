<template>
  <view class="common-header">
    <!-- 用户信息 -->
    <view class="user-info">
      <view class="avatar-wrapper">
        <image
          class="avatar"
          src="/static/avatar.png"
          mode="aspectFill"
        ></image>
      </view>
      <view class="user-details">
        <view class="username">游客250221</view>
        <view class="points">积分 304</view>
      </view>
    </view>

    <!-- Banner图像 -->
    <view class="banner">
      <image class="banner-image" :src="bannerSrc" mode="aspectFill"></image>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// 如果需要可以添加更多动态功能
import { onLoad } from "@dcloudio/uni-app";
import { SecneType } from "./type.d";

const bannerSrc = ref<string>("");

const getBannerSrcByKey = (key: SecneType): string => {
  switch (key) {
    case "hydrogenVehicle":
      return "../../static/changeScene/hydrogenVehicle.png";
    case "gasElectricity":
      return "../../static/changeScene/gasElectricity.png";
    case "water":
      return "../../static/changeScene/water.png";
    case "bike":
      return "../../static/changeScene/bike.png";
    case "zeroCarbonHouse":
      return "../../static/changeScene/zeroCarbonHouse.png";
    default:
      return "../../static/changeScene/hydrogenVehicle.png";
  }
};

// 场景变化处理函数
const handleSceneChange = (sceneId: SecneType) => {
  console.log("收到场景变化事件:", sceneId);
  bannerSrc.value = getBannerSrcByKey(sceneId);
};

onMounted(() => {
  // 在组件挂载时设置事件监听
  uni.$on("sceneChange", handleSceneChange);
});

onUnmounted(() => {
  // 在组件卸载时移除事件监听
  uni.$off("sceneChange", handleSceneChange);
});

onLoad(() => {
  console.log("CommonHeader 组件已加载");
  // 初始化时从存储中获取场景ID
  uni.getStorage({
    key: "SceneContent",
    success: function (res) {
      if (res.data) {
        console.log("从存储中获取到场景ID:", res.data);
        bannerSrc.value = getBannerSrcByKey(res.data);
      }
    },
    fail: function () {
      console.log("未找到存储的场景ID，使用默认场景");
      bannerSrc.value = getBannerSrcByKey("hydrogenVehicle");
    },
  });
});
</script>

<style scoped>
.common-header {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #bbf3e6;
}

.banner {
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.user-info {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
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
  color: #38B868;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
}
</style>
