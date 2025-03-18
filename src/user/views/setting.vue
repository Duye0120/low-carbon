<template>
  <view class="page-wrapper">
    <van-cell-group>
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title">
        <template #right-icon>
          <van-icon
            @click="toSomePage(item)"
            name="arrow"
            size="16"
            color="#C5C8CE"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <van-dialog
      use-slot
      :closeOnClickOverlay="true"
      :show="show"
      :show-confirm-button="false"
    >
      <view style="padding: 32rpx">
        <agreement :index="index" />
      </view>
    </van-dialog>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import agreement from "@/pages/components/agreement.vue";
let index = ref(0);
let show = ref(false);
let showDialog = ref(false);
let list = [
  {
    title: "隐私政策",
  },
  {
    title: "用户协议",
  },
];
const toSomePage = (item: { title: string }) => {
  console.log(item);
  switch (item.title) {
    case "隐私政策":
      index.value = 1;
      show.value = true;
      break;
    case "用户协议":
      index.value = 0;
      show.value = true;
      break;
  }
};
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  height: 100%;
  .dialog-buttonLine {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20rpx;
    margin-top: 60rpx;
    .allowd {
      border: none;
      height: 80rpx;
      width: 100%;
      background: #03c15f;
      border-radius: 8rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #ffffff;
      line-height: 80rpx;
      text-align: center;
    }
    .cancel {
      border: none;
      height: 80rpx;
      width: 100%;
      background: rgb(227, 242, 221);
      border-radius: 8rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: rgb(113, 188, 85);
      line-height: 80rpx;
      text-align: center;
    }
  }
}
.van-dialog__content {
  height: 36rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 32rpx;
  color: rgba(0, 0, 0, 0.85);
  line-height: 36rpx;
  text-align: center;
  margin-top: 48rpx;
  margin-bottom: 64rpx;
}
</style>
