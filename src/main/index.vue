<template>
  <view class="container">
    <!-- 固定的头部区域 -->
    <view class="fixed-header">
      <CommonHeader />
    </view>

    <view class="content">
      <!-- 固定的导航选项卡 -->
      <view class="fixed-tabs">
        <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab.id)">
          <image class="tab-icon" :src="tab.icon" mode="aspectFit"></image>
          <text class="tab-text">{{ tab.title }}</text>
        </view>
      </view>

      <!-- 可滚动的内容区域 -->
      <view class="scrollable-content">
        <!-- 场景切换 -->
        <SceneContent v-if="activeTab === 'scene'" />

        <!-- 任务列表 -->
        <TaskContent v-if="activeTab === 'task'" />

        <!-- 排行榜 -->
        <RankingContent v-if="activeTab === 'ranking'" />
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import CommonHeader from './components/CommonHeader.vue';
import SceneContent from './components/content/SceneContent.vue';
import TaskContent from './components/content/TaskContent.vue';
import RankingContent from './components/content/RankingContent.vue';

// 当前激活的选项卡
const activeTab = ref('scene');

// 选项卡数据
const tabs = [
  {
    id: 'scene',
    title: '场景切换',
    icon: '/static/icon-scene.png'
  },
  {
    id: 'task',
    title: '任务列表',
    icon: '/static/icon-task.png'
  },
  {
    id: 'ranking',
    title: '排行榜',
    icon: '/static/icon-ranking.png'
  }
];

// 切换选项卡
const switchTab = (tabId: string) => {
  activeTab.value = tabId;
};

// 页面加载时从URL参数中获取选中的选项卡
onLoad((query) => {
  console.log('Page loaded with query:', query);
  if (query && query.tab) {
    activeTab.value = query.tab;
  } else {
    console.log('No tab option found in the query, using default tab.');
  }
});
</script>

<style scoped>
.container {
  position: relative;
  height: 100vh;
  /* 设置容器高度为视口高度 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* 防止整体滚动 */
}

.content {
  flex: 1;
  /* 占用剩余空间 */
  display: flex;
  flex-direction: column;
  background-color: #4DA050;
}

.fixed-header {
  flex-shrink: 0;
  /* 防止头部区域被压缩 */
  z-index: 10;
  height: 432rpx;
  overflow: hidden;
}

.fixed-tabs {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  border-radius: 10rpx;
  z-index: 10;
  flex-shrink: 0;
  /* 防止导航区域被压缩 */
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx 0;
  width: 218rpx;
  height: 208rpx;
  background: #FFFFFF;
  border-radius: 8rpx;
}

.tab-icon {
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 10rpx;
}

.tab-text {
  font-size: 26rpx;
  color: #666;
}

.active .tab-text {
  color: #4CAF50;
}

.scrollable-content {
  flex: 1;
  /* 占用剩余空间 */
  overflow-y: auto;
  /* 允许垂直滚动 */
  padding: 0 20rpx;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  /* 在iOS上提供平滑滚动 */
}
</style>
