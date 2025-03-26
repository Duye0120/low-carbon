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
        <view class="task-button" :class="{ completed: task.completed }" @click="completeTask(task)">
          {{ task.completed ? '已完成' : renderType(task.key) }}
        </view>
      </view>
    </view>
    <!-- 添加底部间距，防止内容被遮挡 -->
    <view class="bottom-spacing"></view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { getDailyTask, finishClockTask } from "@/main/api";
import { taskList } from "./taskList";
let props = defineProps<{
  type: string;
  pointId: string;
}>();
// 任务数据
const tasks = ref([]);

// 完成任务
const completeTask = (task: any) => {
  if (task.completed) {
    return;
  }
  switch (task.key) {
    case 'question':
      uni.navigateTo({
        url: `/main/question-answer?taskId=${task.taskId}&pointId=${props.pointId}`
      })
      // 答题
      break;
    case 'article':
      uni.navigateTo({
        url: `/main/image-text?taskId=${task.taskId}&pointId=${props.pointId}`
      })
      // 浏览
      break;
    default:
      // 打卡
      finishTask(task);
      break;
  }
};

const finishTask = (task: any) => {
  finishClockTask({
    pointId: props.pointId,
    wxId: uni.getStorageSync("uuid"),
    clockType: task.key
  }).then(() => {
    uni.showToast({
      title: '打卡成功',
      icon: 'none'
    })
    getTask();
  })
};

const renderType = (type: string) => {
  switch (type) {
    case 'question':
      return '答题';
    case 'article':
      return '浏览';
    default:
      return '打卡';
  }
};

let typeTask = {
  乘坐氢能交通: [
    '氢能大巴打卡',
    '氢能自行车打卡',
    '光伏充电座椅打卡',
    '每日任务·知识问答',
    '每日任务·浏览文章'
  ],
  发电步道发电: [
    '走电步道打卡',
    '每日任务·知识问答',
    '每日任务·浏览文章'
  ],
  喝海露纯净水: [
    '喝海露水打卡',
    '每日任务·知识问答',
    '每日任务·浏览文章'
  ],
  体验零碳单车: [
    '体验零碳单车打卡',
    '每日任务·知识问答',
    '每日任务·浏览文章'
  ],
  零碳小屋: [
    '零碳小屋打卡',
    '每日任务·知识问答',
    '每日任务·浏览文章'
  ],
}

const getTask = () => {
  getDailyTask({
    pointId: props.pointId,
    wxId: uni.getStorageSync("uuid"),
  }).then((res) => {
    tasks.value = typeTask[props.type].map((item) => taskList.find((task) => task.title === item));
    tasks.value.forEach(element => {
      let item = res.find((task) => task.taskType === element.key)
      element.completed = item?.taskStatus === '1';
      element.taskId = item?.taskId;
    });
  });
};

watch(() => props.pointId, () => {
  if (props.pointId) {
    getTask();
  }
});

onMounted(() => {
  getTask();
});

</script>

<style scoped>
.task-container {
  padding: 20rpx 0;
  position: relative;
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
  width: 152rpx;
  height: 128rpx;
  margin-right: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-icon image {
  width: 152rpx;
  height: 128rpx;
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
