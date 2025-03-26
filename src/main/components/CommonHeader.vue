<template>
  <view class="common-header">
    <!-- 用户信息 -->
    <view class="user-info">
      <view class="avatar-wrapper">
        <image
          class="avatar"
          :src="info ? info.headImg ? config.fileUrl + info.headImg : '/static/avatar.png' : '/static/avatar.png'"
          mode="aspectFill"
        ></image>
      </view>
      <view class="user-details">
        <view class="username">{{ info ? info.userName : "游客" }}</view>
        <view class="points">{{ scoreName(info ? info.remainScore : 0) }}</view>
      </view>
    </view>

    <!-- Banner图像 -->
    <view class="banner">
      <image class="banner-image" :src="bannerSrc" mode="aspectFill"></image>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { getUserInfoByOpenId } from "@/api/account";
import config from "@/config";
import { scoreName } from "@/pages/api/scoreName";
// 如果需要可以添加更多动态功能
import { SecneType } from "./type.d";
const props = withDefaults(defineProps<{ sceneId: SecneType }>(), { sceneId: "" });

const bannerSrc = ref<string>("");
let info = ref<any>(null);
const getBannerSrcByKey = (key: SecneType): string => {
  switch (key) {
    case "hydrogenVehicle":
      return "../static/hydrogenVehicleBanner.png";
    case "gasElectricity":
      return "../static/gasElectricityBanner.png";
    case "water":
      return "../static/waterBanner.png";
    case "bike":
      return "../static/bikeBanner.png";
    case "zeroCarbonHouse":
      return "../static/zeroCarbonHouseBanner.png";
    default:
      return "../static/hydrogenVehicleBanner.png";
  }
};

// 场景变化处理函数
const handleSceneChange = (scene: { realId: string; title: string, id: string }) => {
  console.log("收到场景变化事件:", scene);
  bannerSrc.value = getBannerSrcByKey(scene.id);
};
const getUserInfoFunc = async () => {
  try {
    let res1 = await getUserInfoByOpenId({
      wxId: uni.getStorageSync("uuid"),
    });
    info.value = res1;
  } catch (error) {}
};

watch(() => props.sceneId, () => {
  console.log("场景变化:", props.sceneId);
  bannerSrc.value = getBannerSrcByKey(props.sceneId);
});

onMounted(() => {
  getUserInfoFunc();
});
</script>

<style scoped>
.common-header {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #bbf3e6;
  overflow: hidden;
}

.banner {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  position: absolute;
  top: 160rpx;
  left: 40rpx;
  z-index: 10;
  display: flex;
  align-items: center;
  width: calc(100% - 80rpx);
}

.avatar-wrapper {
  width: 102rpx;
  height: 102rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10rpx;
  background-color: #fff;
  position: relative;
  z-index: 2;
  border: 2rpx solid #ffffff;
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
  padding: 0 35rpx 0 120rpx;
  border-radius: 45rpx;
  position: relative;
  left: -100rpx;
  z-index: 1;
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
