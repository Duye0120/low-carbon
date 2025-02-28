<template>
  <view class="page-wrapper">
    <view class="page-wrapper-corpuscleList">
      <view
        class="page-wrapper-corpuscleList-item"
        v-for="item in medalList"
        :key="item.name"
      >
        <view
          class="page-wrapper-corpuscleList-item-pic"
          :style="{
            width: `${findBackground(item.name)?.width}rpx`,
            height: `${findBackground(item.name)?.height}rpx`,
            background: `url(${
              findBackground(item.name)?.activeImg
            }) no-repeat center / ${findBackground(item.name)?.width}rpx ${
              findBackground(item.name)?.height
            }rpx`,
          }"
        >
        </view>
        <view class="page-wrapper-corpuscleList-item-name">{{
          item.name
        }}</view>
        <view class="page-wrapper-corpuscleList-item-time">{{
          item.time
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const findBackground = (name: string) => {
  return backgroundList.find((i) => name.indexOf(i.name) > -1);
};
let backgroundList = [
  {
    name: "勋章名称1",
    width: 120,
    height: 138,
    img: "../static/unExchange1.png",
    activeImg: "../static/exchanged1.png",
  },
  {
    name: "勋章名称2",
    width: 118,
    height: 142,
    img: "../static/unExchange2.png",
    activeImg: "../static/exchanged2.png",
  },
  {
    name: "勋章名称3",
    width: 142,
    height: 138,
    img: "../static/unExchange3.png",
    activeImg: "../static/exchanged3.png",
  },
  {
    name: "勋章名称4",
    width: 120,
    height: 146,
    img: "../static/unExchange4.png",
    activeImg: "../static/exchanged4.png",
  },
];
let medalList = ref([
  {
    name: "勋章名称1-1",
    time: "2024-10-10",
  },
  {
    name: "勋章名称2-2",
    time: "2024-10-10",
  },
  {
    name: "勋章名称3-1",
    time: "2024-10-10",
  },
  {
    name: "勋章名称4-3",
    time: "2024-10-10",
  },
]);
</script>

<style scoped lang="scss">
.page-wrapper {
  width: calc(100% - 64rpx);
  min-height: calc(100% - 64rpx);
  padding: 32rpx;
  background: #f1f8ff;
  &-corpuscleList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16rpx;
    &-item {
      padding-top: 32rpx;
      padding-bottom: 22rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #FFFFFF;
      height: 296rpx;
      justify-content: space-around;

      &-pic {
        display: flex;
        align-items: center;
        .submit-button {
          width: 100%;
          height: 56rpx;
          border-radius: 8rpx;
          color: #ffffff;
          line-height: 56rpx;
          background-color: #3bb872;
          border: none;
        }
      }
      &-name {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
      }
      &-cost {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.65);
      }
      &-time {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>
