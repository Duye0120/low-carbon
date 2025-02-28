<template>
  <view class="container">
    <!-- 固定的头部区域 -->
    <view class="fixed-header">
      <CommonHeader />
    </view>

    <view class="content" :style="{ backgroundColor: primaryColor }">
      <!-- 固定的导航选项卡 -->
      <view class="fixed-tabs">
        <view
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-item"
          :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab.id)"
        >
          <image class="tab-icon" :src="tab.icon" mode="aspectFit"></image>
          <text class="tab-text">{{ tab.title }}</text>
        </view>
        <view
          class="top-circle"
          :style="{ left: getCircleLeft(activeTab) }"
        ></view>
      </view>

      <!-- 可滚动的内容区域 -->
      <view class="scrollable-content">
        <!-- 场景切换 -->
        <SceneContent v-if="activeTab === 'scene'" type="page" />

        <!-- 任务列表 -->
        <TaskContent v-if="activeTab === 'task'" />

        <!-- 排行榜 -->
        <RankingContent v-if="activeTab === 'ranking'" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import CommonHeader from "./components/CommonHeader.vue";
import SceneContent from "../components/SceneContent.vue";
import TaskContent from "./components/content/TaskContent.vue";
import RankingContent from "./components/content/RankingContent.vue";
import { SecneType } from "./components/type.d";

// 当前激活的选项卡
const activeTab = ref("scene");
const primaryColor = ref("#4da050");

// 选项卡数据
const tabs = [
  {
    id: "scene",
    title: "场景切换",
    icon: "./static/map.png",
  },
  {
    id: "task",
    title: "任务列表",
    icon: "./static/taskList.png",
  },
  {
    id: "ranking",
    title: "排行榜",
    icon: "./static/ranking.png",
  },
];

// 切换选项卡
const switchTab = (tabId: string) => {
  activeTab.value = tabId;
};

// 页面加载时从URL参数中获取选中的选项卡
onLoad((query) => {
  console.log("Page loaded with query:", query);
  if (query && query.tab) {
    activeTab.value = query.tab;
  } else {
    console.log("No tab option found in the query, using default tab.");
  }
});

const getCircleLeft = (activeTab: string): string => {
  switch (activeTab) {
    case "scene":
      return "17%";
    case "task":
      return "50%";
    case "ranking":
      return "83%";
    default:
      return "0";
  }
};

// 场景变化处理函数
const handleSceneChange = (sceneId: SecneType) => {
  console.log("收到场景变化事件:", sceneId);
  primaryColor.value = getPrimaryColorByScene(sceneId);
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
        primaryColor.value = getPrimaryColorByScene(res.data);
      }
    },
    fail: function () {
      console.log("未找到存储的场景ID，使用默认场景");
      primaryColor.value = getPrimaryColorByScene("hydrogenVehicle");
    },
  });
});

const getPrimaryColorByScene = (sceneId: SecneType): string => {
  switch (sceneId) {
    case "hydrogenVehicle":
      return "#D5D463";
    case "gasElectricity":
      return "#816A69";
    case "water":
      return "#4AB8D7";
    case "bike":
      return "#4DA050";
    case "zeroCarbonHouse":
      return "#87E3BE";
    default:
      return "#4da050";
  }
};
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
  height: calc(100% - 432rpx);
  /* 占用剩余空间 */
  display: flex;
  flex-direction: column;
  background-color: #4da050;
  margin-bottom: 40rpx;
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
  position: relative;
  /* 防止导航区域被压缩 */
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 218rpx;
  height: 208rpx;
  background: #ffffff;
  border-radius: 8rpx;
}

.tab-icon {
  width: 82rpx;
  height: 94rpx;
  margin-bottom: 10rpx;
}

.tab-text {
  font-size: 26rpx;
  color: #666;
}

.active .tab-text {
  color: #4caf50;
}

.scrollable-content {
  flex: 1;
  /* 占用剩余空间 */
  overflow-y: auto;
  /* 允许垂直滚动 */
  margin: 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
  /* 在iOS上提供平滑滚动 */
  position: relative;
  border-radius: 8rpx;
}

/* 头部三角形 */
.top-circle {
  width: 0;
  height: 0;
  border-bottom: 20rpx solid #fff;
  border-left: 20rpx solid transparent;
  border-right: 20rpx solid transparent;
  position: absolute;
  bottom: -20rpx;
  /* left: 50%; */
  transform: translateX(-50%);
  /* 三角形位置移动的时候添加动画 */
  transition: all 0.3s ease;
  z-index: 10;
}
</style>
