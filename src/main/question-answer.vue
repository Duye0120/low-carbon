<template>
  <view class="page-wrapper">
    <view class="page-wrapper-header">
      <image
        style="height: 662rpx"
        mode="heightFix"
        src="./static/q&a-headerBg.png"
        alt=""
      />
    </view>
    <view class="page-wrapper-content">
      <view class="page-wrapper-content-question">{{ question }}</view>
      <view class="page-wrapper-content-answer">
        <button
          @click="selectAnswer(item)"
          :class="{
            'answer-button-true': item.label === answer && isRight !== null && item.isRight,
            'answer-button-wrong': item.label === answer && isRight !== null && !item.isRight
          }"
          v-for="item in options"
          :key="item.value"
          class="answer-button"
          type="button"
          plain
        >
          {{ item.label }}
        </button>
      </view>
      <view
        :class="[
          'page-wrapper-content-result',
          isRight === null ? '' : isRight ? 'right' : 'wrong',
        ]"
        v-if="isRight !== null"
      >
        回答{{ isRight && answer ? "正确" : "错误" }}，{{
          isRight && answer ? "恭喜获得5点积分" : "送你1点零碳积分再接再厉"
        }}
      </view>
      <view
        class="page-wrapper-content-analyze"
        v-if="isRight !== null && !isRight"
      >
        <label>解析</label>{{ analyze }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let question = ref("下列哪种物质不属于有害垃圾？");
let options = ref([
  {
    label: "废电池",
    value: "1",
    isRight: false,
  },
  {
    label: "废报纸",
    value: "2",
    isRight: true,
  },
]);
let answer = ref("");
let isRight = ref<any>(null);
let analyze = ref("废电池属于有害垃圾；废报纸属于可回收垃圾。");
const selectAnswer = (item: {
  label: string;
  value: string;
  isRight: boolean;
}) => {
  console.log(item, "item");
  answer.value = item.label;
  isRight.value = item.isRight;
}
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  height: 100%;
  &-header {
    width: 100%;
    // background: url("./static/q&a-headerBg.png") no-repeat center / 100% 100%;
    height: 662rpx;
    margin-bottom: -28rpx;
    position: relative;
    z-index: 1;
  }
  &-content {
    width: calc(100% - 120rpx);
    height: calc(100% - 634rpx);
    background: #ffffff;
    border-radius: 28rpx;
    z-index: 10;
    position: relative;
    padding: 0 60rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    &-question {
      width: 100%;
      text-align: center;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
    }
    &-answer {
      .answer-button:not(:last-child) {
        margin-bottom: 38rpx;
      }
      .answer-button {
        border: none;
        width: 450rpx;
        height: 84rpx;
        background: #f7f7f7;
        border-radius: 46rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 32rpx;
        color: rgba(0, 0, 0, 0.85);
        text-align: center;
        line-height: 84rpx;
      }
      .answer-button-true {
        background: #00c463;
        color: #ffffff;
      }
      .answer-button-wrong {
        background: #E50000;
        color: #ffffff;
      }
    }
    &-result {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #e50000;
      text-align: center;
      .right {
        color: #00c463 !important;
      }
      .wrong {
        color: #e50000 !important;
      }
    }
    &-analyze {
      & > label {
        width: 96rpx;
        height: 48rpx;
        background: #e50000;
        display: inline-block;
        text-align: center;
        line-height: 48rpx;
        margin-right: 16rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #ffffff;
      }
    }
  }
}
</style>
