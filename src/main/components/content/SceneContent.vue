<template>
  <view class="scene-container">
    <view class="scene-grid">
      <view v-for="(scene, index) in scenes" :key="index" class="scene-item">
        <image class="scene-image" :src="scene.image" mode="aspectFill"></image>
        <view class="scene-title">{{ scene.title }}</view>
        <view class="scene-button" :class="{ active: scene.active }" @click="switchScene(index)">
          {{ scene.active ? '已切换' : '切换' }}
        </view>
      </view>
    </view>
    <!-- 添加底部间距，防止内容被遮挡 -->
    <view class="bottom-spacing"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 场景数据
const scenes = ref([
  {
    id: 1,
    title: '乘坐氢能交通工具',
    image: '../../static/changeScene/hydrogenVehicle.png',
    active: true
  },
  {
    id: 2,
    title: '走发电步道发电',
    image: '/static/scene-2.png',
    active: false
  },
  {
    id: 3,
    title: '喝海露纯净水',
    image: '../../static/changeScene/water.png',
    active: false
  },
  {
    id: 4,
    title: '体验零碳单车',
    image: '../../static/changeScene/bike.png',
    active: false
  },
  {
    id: 5,
    title: '零碳小屋',
    image: '../../static/changeScene/zeroCarbonHouse.png',
    active: false
  }
]);

// 切换场景
const switchScene = (index: number) => {
  scenes.value.forEach((scene, i) => {
    scene.active = i === index;
  });
};
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
  background-color: #EFF8F3;
  border-radius: 10rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx; 
}

.scene-image {
  width: 100%;
  height: 200rpx;
  margin-bottom: 10rpx;
}

.scene-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 15rpx;
}

.scene-button {
  background-color: #e0e0e0;
  color: #666;
  font-size: 24rpx;
  border-radius: 28rpx;
  width: 198rpx;
  height: 56rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scene-button.active {
  background-color: #4CAF50;
  color: white;
}

.bottom-spacing {
  height: 40rpx;
  /* 添加底部间距，防止最后一个元素被遮挡 */
}
</style>
