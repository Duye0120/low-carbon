<template>
  <van-overlay
    :show="show"
    @click="onClickOverlay"
    custom-style="background-color: rgba(0, 0, 0, 0.6);"
  >
    <view class="sign-in-container">
      <view class="sign-in-content">
        <!-- 签到天数提示 -->
        <view class="sign-in-days">
          <text>— 已累计签到 {{ currentDay }} 天 —</text>
        </view>

        <!-- 签到奖励网格 -->
        <view class="rewards-grid">
          <!-- 前四天奖励 -->
          <view class="rewards-row">
            <view
              v-for="(item, index) in rewards.slice(0, 4)"
              :key="index"
              class="reward-item"
              :class="{
                signed: currentDay > index,
                currentDay: currentDay === index,
              }"
            >
              <view>
                <view class="coin-icon">
                  <view
                    :class="`coin-${item.point}`"
                    :style="{ backgroundImage: 'url(' + item.url + ')' }"
                  ></view>
                  <text class="reward-value">+{{ item.value }}</text>
                </view>
                <view v-if="currentDay > index" class="check-icon"></view>
              </view>
              <view class="day-label">第{{ item.day }}天</view>
            </view>
          </view>

          <!-- 后三天奖励 -->
          <view class="rewards-row-3">
            <view
              v-for="(item, index) in rewards.slice(4)"
              :key="index + 4"
              class="reward-item"
              :class="{ signed: currentDay > index + 4 }"
            >
              <view class="coin-icon">
                <view
                  :class="`coin-${item.point}`"
                  :style="{ backgroundImage: 'url(' + item.url + ')' }"
                ></view>
                <text class="reward-value">+{{ item.value }}</text>
              </view>
              <view class="day-label">第{{ item.day }}天</view>
              <view v-if="currentDay > index + 4" class="check-icon"></view>
            </view>
          </view>
        </view>

        <!-- 签到按钮 -->
        <view class="sign-in-button" @click="signIn">
          <text>立即签到</text>
        </view>

        <!-- 关闭按钮 -->
        <view class="close-button" @click="closeOverlay"> </view>
      </view>
    </view>
  </van-overlay>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// 定义组件属性
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

// 定义组件事件
const emit = defineEmits(["update:show", "close", "sign-in"]);

// 当前签到天数
const currentDay = ref(3);

// 签到奖励配置
const rewards = ref([
  { day: "一", value: 5, url: "../static/1point.png", point: 1 },
  { day: "二", value: 10, url: "../static/1point.png", point: 1 },
  { day: "三", value: 15, url: "../static/2point.png", point: 3 },
  { day: "四", value: 20, url: "../static/2point.png", point: 3 },
  { day: "五", value: 25, url: "../static/3point.png", point: 3 },
  { day: "六", value: 30, url: "../static/3point.png", point: 3 },
  { day: "七", value: 50, url: "../static/6point.png", point: 6 },
]);

// 点击蒙层
const onClickOverlay = (event: Event) => {
  // 阻止事件冒泡，防止点击内容区域时关闭弹窗
  event.stopPropagation();
};

// 关闭弹窗
const closeOverlay = () => {
  emit("update:show", false);
  emit("close");
};

// 签到
const signIn = () => {
  // 执行签到逻辑
  if (currentDay.value < 7) {
    currentDay.value++;
  }
  emit("sign-in", currentDay.value);

  // 签到后自动关闭弹窗
  setTimeout(() => {
    closeOverlay();
  }, 1000);
};
</script>

<style scoped lang="scss">
.sign-in-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.sign-in-content {
  position: relative;
  width: 600rpx;
  height: 824rpx;
  background: url("/static/overlay-bg.svg") no-repeat;
  background-size: 100% 100%;
  border-radius: 20rpx;
  padding-top: 220rpx;
  padding: 200rpx 46rpx 14rpx 46rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sign-in-header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -60rpx;
}

.calendar-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: #ff5252;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -20rpx;
  z-index: 2;
  border: 4rpx solid #fff;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.calendar-day {
  color: white;
  font-weight: bold;
  font-size: 36rpx;
}

.title-ribbon {
  background-color: #ff5252;
  padding: 20rpx 60rpx;
  border-radius: 30rpx;
  position: relative;
  z-index: 1;
}

.title-text {
  color: white;
  font-size: 32rpx;
  font-weight: bold;
}

.sign-in-days {
  margin: 40rpx 0 30rpx;
  font-size: 28rpx;
  color: #8b4513;
}

.rewards-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 54rpx;
  margin-bottom: 50rpx;
}

.rewards-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20rpx;
  justify-content: space-between;
  width: 100%;
}

.rewards-row-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: 20rpx;
  justify-content: space-between;
  width: 100%;
}

.currentDay {
  border: 2rpx solid #ffe500;
  box-shadow: inset 0rpx 0rpx 14rpx 0rpx #fff100;
}

.reward-item {
  width: 100%;
  height: 120rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.coin-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coin-1 {
  width: 60rpx;
  height: 28rpx;
  background-size: 100% 100%;
}

.coin-2 {
  width: 60rpx;
  height: 38rpx;
  background-size: 100% 100%;
}

.coin-3 {
  width: 60rpx;
  height: 46rpx;
  background-size: 100% 100%;
}

.coin-6 {
  width: 122rpx;
  height: 50rpx;
  background-size: 100% 100%;
}

.reward-value {
  font-size: 24rpx;
  color: #ff8f00;
  font-weight: bold;
  margin-top: 8rpx;
}

.day-label {
  font-size: 26rpx;
  color: #8e5e46;
  position: absolute;
  bottom: -50rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
}

.check-icon {
  position: absolute;
  right: -10rpx;
  bottom: -18rpx;
  width: 40rpx;
  height: 40rpx;
  background-image: url('../../static/check.png');
  background-size: 100% 100%;
  border-radius: 50%;
}

.sign-in-button {
  width: 80%;
  height: 80rpx;
  background-color: #ffa000;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30rpx;
  font-weight: bold;
  margin-top: 34rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  bottom: -80rpx;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/static/close.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* .close-icon {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #fff;
  position: relative;

} */
</style>
