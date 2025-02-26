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
      <image class="banner-image" :src="bannerSrc" mode="widthFix"></image>
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
      return "../static/changeScene/hydrogenVehicle.png";
    case "gasElectricity":
      return "../static/changeScene/gasElectricity.svg";
    case "water":
      return "../static/changeScene/water.svg";
    case "bike":
      return "../static/changeScene/bike.png";
    case "zeroCarbonHouse":
      return "../static/changeScene/zeroCarbonHouse.png";
    default:
      return "../static/changeScene/hydrogenVehicle.png";
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
  position: relative;
  background-color: #bbf3e6;
}

.banner {
  width: 100%;
}

.banner-image {
  width: 100%;
  display: block;
  /* 等比例缩放 */
  object-fit: cover;
}

.user-info {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  z-index: 10;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
}

.avatar-wrapper {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10rpx;
}

.avatar {
  width: 100%;
  height: 100%;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 26rpx;
  color: #333;
}

.points {
  font-size: 22rpx;
  color: #4caf50;
}
</style>
