<template>
  <view class="page-wrapper">
    <view class="page-wrapper-textarea">
      <textarea v-model="feedback" placeholder="请输入..." />
    </view>
    <view class="bottom-area">
      <button @tap="submitForm" class="submit-button" type="button" plain>
        提交
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let feedback = ref("");
const submitForm = () => {};
</script>

<style scoped lang="scss">
.page-wrapper {
  width: calc(100% - 64rpx);
  height: calc(100% - 64rpx);
  background-color: #fff;
  padding: 32rpx;
  &-textarea {
    border: 1px solid #dcdee2;
    border-radius: 15rpx;
    > textarea {
      width: calc(100% - 40rpx);
      padding: 20rpx;
    }
  }
}
.bottom-area {
  padding-top: 100rpx;

  .submit-button {
    width: 100%;
    height: 72rpx;
    background-color: #6EC58A;
    border-radius: 8rpx;
    color: #ffffff;
    font-size: 32rpx;
    line-height: 72rpx;
    border: none;
  }
}
</style>
