<template>
  <view class="scene-container">
    <view class="scene-grid">
      <view v-for="(scene, index) in scenes" :key="index" class="scene-item">
        <image class="scene-image" :src="scene.image" mode="aspectFill"></image>
        <view class="scene-title">{{ scene.title }}</view>
        <view
          class="scene-button"
          :class="{ active: scene.active }"
          @click="switchScene(scene.id)"
        >
          {{ scene.active ? "已切换" : "切换" }}
        </view>
      </view>
    </view>
    <!-- 添加底部间距，防止内容被遮挡 -->
    <view class="bottom-spacing"></view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, ref } from "vue";

// 场景数据
const scenes = ref([
  {
    id: "hydrogenVehicle",
    title: "乘坐氢能交通工具",
    image: "../../static/changeScene/hydrogenVehicle.png",
    active: false,
  },
  {
    id: "gasElectricity",
    title: "走发电步道发电",
    image: "../../static/changeScene/gasElectricity.svg",
    active: false,
  },
  {
    id: "water",
    title: "喝海露纯净水",
    image: "../../static/changeScene/water.svg",
    active: false,
  },
  {
    id: "bike",
    title: "体验零碳单车",
    image: "../../static/changeScene/bike.png",
    active: false,
  },
  {
    id: "zeroCarbonHouse",
    title: "零碳小屋",
    image: "../../static/changeScene/zeroCarbonHouse.png",
    active: false,
  },
]);

// 切换场景
const switchScene = (id: string) => {
  scenes.value.forEach((scene) => {
    scene.active = scene.id === id;
  });
  // 先存储数据
  uni.setStorage({
    key: "SceneContent",
    data: id,
    success: function () {
      console.log("场景数据存储成功");
      // 存储成功后发送事件
      setTimeout(() => {
        uni.$emit("sceneChange", id);
        console.log("已发送场景变化事件:", id);
      }, 100);
    },
  });
};

onLoad(() => {
  uni.getStorage({
    key: "SceneContent",
    success: function (res) {
      if (res.data) {
        switchScene(res.data);
      }
    },
    fail: function () {
      switchScene("hydrogenVehicle");
      console.log("未找到存储的场景ID，使用默认场景");
    },
  });
});
</script>

<style scoped>
.scene-container {
  padding: 24rpx;
}

.scene-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.scene-item {
  background-color: #eff8f3;
  border-radius: 10rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx;
}

.scene-image {
  width: 100%;
  height: 160rpx;
  border-radius: 16rpx;
}

.scene-title {
  font-size: 28rpx;
  color: rgba(0, 0, 0, 0.85);
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  margin: 8rpx 0;
}

.scene-button {
  background: linear-gradient(270deg, #39b675 0%, #4bc352 100%);
  color: #fff;
  font-size: 28rpx;
  border-radius: 28rpx;
  width: 198rpx;
  height: 56rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scene-button.active {
  background: rgba(255, 255, 255, 0);
  color: #39b772;
  border: 2rpx solid #3bb872;
}

.bottom-spacing {
  height: 40rpx;
  /* 添加底部间距，防止最后一个元素被遮挡 */
}
</style>
