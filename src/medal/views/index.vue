<template>
  <view class="page-wrapper">
    <view class="page-wrapper-header">
      <view class="page-wrapper-header-detail">
        <image class="avatar" src="/static/logo.png" mode="widthFix" />
        <view class="recordList">
          <view
            @click="routeTo(item)"
            class="recordList-item"
            v-for="item in recordList"
            :key="item.label"
          >
            <view class="recordList-item-value">{{ item.value }}</view>
            <view class="recordList-item-label">{{ item.label }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="page-wrapper-content">
      <view class="page-wrapper-content-menu">
        <view
          @click="changeTab('电子勋章')"
          class="page-wrapper-content-menu-item"
          :class="{ active: activeTab === '电子勋章' }"
          >电子勋章</view
        >
        <view
          @click="changeTab('实物勋章')"
          class="page-wrapper-content-menu-item"
          :class="{ active: activeTab === '实物勋章' }"
          >实物勋章</view
        >
      </view>
      <view
        class="page-wrapper-content-corpuscleList"
        v-if="activeTab === '电子勋章'"
      >
        <view
          class="page-wrapper-content-corpuscleList-item"
          v-for="item in medalList"
          :key="item.name"
        >
          <view
            class="page-wrapper-content-corpuscleList-item-pic"
            :style="{
              width: `${findBackground(item.name)?.width}rpx`,
              height: `${findBackground(item.name)?.height}rpx`,
              background: `url(${
                item.haveExchange
                  ? findBackground(item.name)?.activeImg
                  : findBackground(item.name)?.img
              }) no-repeat center / ${findBackground(item.name)?.width}rpx ${
                findBackground(item.name)?.height
              }rpx`,
            }"
          >
            <button
              v-if="!item.haveExchange"
              class="submit-button"
              type="button"
              plain
            >
              兑换
            </button>
          </view>
          <view class="page-wrapper-content-corpuscleList-item-name">{{
            item.name
          }}</view>
          <view
            class="page-wrapper-content-corpuscleList-item-cost"
            v-if="!item.haveExchange"
            >{{ item.cost }}</view
          >
          <view
            class="page-wrapper-content-corpuscleList-item-time"
            v-if="item.haveExchange"
            >{{ item.time }}</view
          >
        </view>
      </view>
      <view
        class="page-wrapper-content-entityList"
        v-if="activeTab === '实物勋章'"
      >
        <view
          class="page-wrapper-content-entityList-item"
          v-for="item in entityList"
          :key="item.name"
        >
          <image src="../static/entityMedal.png" mode="widthFix"></image>
          <view class="page-wrapper-content-entityList-item-content">
            <view class="page-wrapper-content-entityList-item-content-title"
              >{{ item.name }}（可至线下领取）</view
            >
            <view
              class="page-wrapper-content-entityList-item-content-describe"
              >{{ item.describe }}</view
            >
            <view class="page-wrapper-content-entityList-item-content-exchange">
              <view class="exchange-left">
                <view class="exchange-left-number">{{ item.cost }}</view>
                <view class="exchange-left-name">电子勋章</view>
              </view>
              <view class="exchange-right">
                <button
                  :class="{
                    'submit-button': !item.hasExchange,
                    'submit-button-disabled': item.hasExchange,
                  }"
                  type="button"
                  plain
                >
                  兑换
                </button></view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let activeTab = ref("电子勋章");
const findBackground = (name: string) => {
  return backgroundList.find((i) => name.indexOf(i.name) > -1);
};
let entityList = ref([
  {
    name: "XX勋章兑换券",
    describe: "可至XX处领取实物勋章",
    cost: 3,
    hasExchange: false,
  },
  {
    name: "XX勋章兑换券",
    describe: "可至XX处领取实物勋章",
    cost: 3,
    hasExchange: true,
  },
  {
    name: "XX勋章兑换券",
    describe: "可至XX处领取实物勋章",
    cost: 3,
    hasExchange: true,
  },
  {
    name: "XX勋章兑换券",
    describe: "可至XX处领取实物勋章",
    cost: 3,
    hasExchange: true,
  },
]);
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
    cost: 100,
    haveExchange: true,
    time: "2024-10-10",
  },
  {
    name: "勋章名称1-2",
    cost: 100,
    haveExchange: false,
    time: "2024-10-10",
  },
  {
    name: "勋章名称1-3",
    cost: 100,
    haveExchange: false,
    time: "2024-10-10",
  },
  {
    name: "勋章名称2-1",
    cost: 100,
    haveExchange: false,
    time: "2024-10-10",
  },
  {
    name: "勋章名称2-2",
    cost: 100,
    haveExchange: true,
    time: "2024-10-10",
  },
  {
    name: "勋章名称2-3",
    cost: 100,
    haveExchange: false,
    time: "2024-10-10",
  },
  {
    name: "勋章名称3-1",
    cost: 100,
    haveExchange: true,
    time: "2024-10-10",
  },
  {
    name: "勋章名称3-2",
    cost: 100,
    haveExchange: false,
    time: "2024-10-10",
  },
  {
    name: "勋章名称3-3",
    cost: 100,
    haveExchange: false,
    time: "2024-10-10",
  },
  {
    name: "勋章名称4-1",
    cost: 100,
    haveExchange: false,
    time: "2024-10-10",
  },
  {
    name: "勋章名称4-2",
    cost: 100,
    haveExchange: false,
    time: "2024-10-10",
  },
  {
    name: "勋章名称4-3",
    cost: 100,
    haveExchange: true,
    time: "2024-10-10",
  },
]);
let recordList = ref([
  {
    label: "零碳积分",
    value: 300,
    url: "/user/views/integral-record",
  },
  {
    label: "电子勋章",
    value: 5,
    url: "/medal/views/myCorpuscle",
  },
  {
    label: "兑换券",
    value: 1,
    url: "/medal/views/certificate",
  },
]);
const changeTab = (tab: string) => {
  console.log(tab);
  activeTab.value = tab;
};
const routeTo = (item: any) => {
  console.log(item);
  uni.navigateTo({
    url: item.url,
  });
};
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  &-header {
    background: url("../static/bg.svg") no-repeat center/100% 101%;
    width: 100%;
    display: flex;
    height: 520rpx;
    &-detail {
      position: absolute;
      top: 150rpx;
      display: flex;
      padding: 48rpx;
      width: calc(100% - 96rpx);

      .avatar {
        width: 120rpx;
        border-radius: 50%;
        border: 1px solid #32c5ff;
      }
      .recordList {
        width: calc(100% - 120rpx);
        display: flex;
        justify-content: space-around;
        align-items: center;
        &-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          &-label {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #ffffff;
          }
          &-value {
            font-family: PingFang-SC, PingFang-SC;
            font-weight: bold;
            font-size: 32rpx;
            color: #ffffff;
          }
        }
      }
    }
  }
  &-content {
    position: absolute;
    top: 360rpx;
    width: 100%;
    background: #ffffff;
    border-radius: 48rpx 48rpx 0rpx 0rpx;
    min-height: calc(100% - 360rpx);
    &-menu {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 80rpx;
      &-item {
        height: 100%;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 28rpx;
        color: #000;
        line-height: 80rpx;
      }
      .active {
        color: #04a634;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0rpx; /* 横线距离 div 底部的位置 */
          left: 50%; /* 横线水平居中 */
          transform: translateX(-50%); /* 微调居中位置 */
          width: 50%; /* 横线长度为父 div 的一半（可自定义） */
          height: 4rpx; /* 横线粗细 */
          background: #04a634; /* 横线颜色 */
          border-radius: 30rpx;
        }
      }
    }
    &-entityList {
      padding: 32rpx 32rpx 32rpx 32rpx;
      display: grid;
      grid-gap: 16rpx;
      &-item {
        width: calc(100% - 48rpx);
        height: 208rpx;
        background: #eff8f3;
        display: flex;
        padding: 24rpx;
        align-items: center;
        > image {
          width: 160rpx;
        }
        &-content {
          width: calc(100% - 160rpx);
          height: calc(100% - 48rpx);
          padding-left: 20rpx;
          padding-right: 10rpx;
          &-title {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: rgba(0, 0, 0, 0.85);
          }
          &-describe {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.65);
            margin-top: 8rpx;
          }
          &-exchange {
            display: flex;
            justify-content: space-between;
            margin-top: 28rpx;
            align-items: baseline;
            .exchange-left {
              display: flex;
              align-items: baseline;
              &-number {
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                font-size: 36rpx;
                color: #06ac44;
              }
              &-name {
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                font-size: 24rpx;
                color: rgba(0, 0, 0, 0.65);
              }
            }
            .exchange-right {
              .submit-button {
                width: 100%;
                height: 56rpx;
                border-radius: 8rpx;
                color: #ffffff;
                line-height: 56rpx;
                background-color: #3bb872;
                border: none;
              }

              .submit-button-disabled {
                width: 100%;
                height: 56rpx;
                border-radius: 8rpx;
                color: rgba(0, 0, 0, 0.25);
                line-height: 56rpx;
                background-color: #d9d9d9;
                border: none;
              }
            }
          }
        }
      }
    }
    &-corpuscleList {
      padding: 32rpx 32rpx 60rpx 32rpx;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 16rpx;
      &-item {
        padding-top: 32rpx;
        padding-bottom: 22rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #eff8f3;
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
}
</style>
