<template>
  <view class="task-container">
    <view class="task-list">
      <view v-for="(task, index) in tasks" :key="index" class="task-item">
        <view class="task-icon">
          <image :src="task.icon" mode="aspectFit"></image>
        </view>
        <view class="task-info">
          <view class="task-title">{{ task.title }}</view>
          <view class="task-desc">{{ task.description }}</view>
        </view>
        <view class="task-button" :class="{ completed: task.completed }" @click="completeTask(index)">
          {{ task.completed ? '已完成' : renderType(task.type) }}
        </view>
      </view>
    </view>
    <!-- 添加底部间距，防止内容被遮挡 -->
    <view class="bottom-spacing"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 任务数据
const tasks = ref([
  {
    id: 1,
    title: '每日任务·打卡签到',
    description: '签到即可获得5点零碳积分',
    icon: '../../static/taskList1.png',
    completed: true,
    // 签到
    type: 'checkin'
  },
  {
    id: 2,
    title: '每日任务·知识问答',
    description: '参与问答可获得1-5点零碳积分',
    icon: '../../static/taskList2.png',
    completed: false,
    // 答题
    type: 'quiz'
  },
  {
    id: 3,
    title: '每日任务·浏览文章',
    description: '阅读文章可获得5点零碳积分',
    icon: '../../static/taskList3.png',
    completed: false,
    // 浏览
    type: 'browse'
  }
]);

// 完成任务
const completeTask = (index: number) => {
  tasks.value[index].completed = true;
};

const renderType = (type: string) => {
  switch (type) {
    case 'checkin':
      return '签到';
    case 'quiz':
      return '答题';
    case 'browse':
      return '浏览';
    default:
      return '';
  }
};
</script>

<style scoped>
.task-container {
  padding: 20rpx 0;
}

.task-list {
  background-color: #fff;
  border-radius: 10rpx;
  display: grid;
  gap: 20rpx;
  padding: 24rpx;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1px solid #f0f0f0;
  background-color: #EFF8F3;
  height: 160rpx;
}

.task-icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-icon image {
  width: 60rpx;
  height: 60rpx;
}

.task-info {
  flex: 1;
}

.task-title {
  font-size: 30rpx;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16rpx;
}

.task-desc {
  font-size: 24rpx;
  color: #999;
}

.task-button {
  background: linear-gradient(270deg, #39B675 0%, #4BC352 100%);
  color: white;
  font-size: 24rpx;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  transition: background 0.3s ease;
}

.task-button.completed {
  background-color: #e0e0e0;
  color: white;
}

.bottom-spacing {
  height: 40rpx;
  /* 添加底部间距，防止最后一个元素被遮挡 */
}
</style>
