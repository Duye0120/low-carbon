<template>
  <view class="page-wrapper">
    <view class="page-wrapper-header">
      <view class="page-wrapper-header-detail">
        <image class="avatar" :src="info ? config.fileUrl + info.headImg : '/static/avatar.png'" mode="widthFix" />
        <view class="recordList">
          <view @click="routeTo(item)" class="recordList-item" v-for="item in recordList" :key="item.label">
            <view class="recordList-item-value">{{ item.value }}</view>
            <view class="recordList-item-label">{{ item.label }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="page-wrapper-content">
      <view class="page-wrapper-content-menu">
        <view @click="changeTab('电子勋章')" class="page-wrapper-content-menu-item"
          :class="{ active: activeTab === '电子勋章' }">电子勋章</view>
        <view @click="changeTab('实物勋章')" class="page-wrapper-content-menu-item"
          :class="{ active: activeTab === '实物勋章' }">实物勋章</view>
      </view>
      <view class="page-wrapper-content-corpuscleList" v-if="activeTab === '电子勋章'">
        <view class="page-wrapper-content-corpuscleList-item" v-for="item in medalList" :key="item.id">
          <view class="page-wrapper-content-corpuscleList-item-pic" :class="{ 'need-change': !item.haveExchange }"
            :style="{
              backgroundImage: `url(${item.img})`,
            }">
          </view>
          <button v-if="!item.haveExchange" @click="exchangeMedal(item)" class="submit-button" type="default" plain>
            兑换
          </button>
          <view class="page-wrapper-content-corpuscleList-item-name">{{
            item.name
            }}</view>
          <view class="page-wrapper-content-corpuscleList-item-cost" v-if="!item.haveExchange">{{ item.cost }}</view>
          <view class="page-wrapper-content-corpuscleList-item-time" v-if="item.haveExchange">{{ item.time }}</view>
        </view>
      </view>
      <view class="page-wrapper-content-entityList" v-if="activeTab === '实物勋章'">
        <view class="page-wrapper-content-entityList-item" v-for="item in entityList" :key="item.name">
          <image :src="item.img" mode="widthFix"></image>
          <view class="page-wrapper-content-entityList-item-content">
            <view class="page-wrapper-content-entityList-item-content-title">{{ item.name }}（可至线下领取）</view>
            <view class="page-wrapper-content-entityList-item-content-describe">{{ item.describe }}</view>
            <view class="page-wrapper-content-entityList-item-content-exchange">
              <view class="exchange-left">
                <view class="exchange-left-number">{{ item.cost }}</view>
                <view class="exchange-left-name">电子勋章</view>
              </view>
              <view class="exchange-right">
                <button @click="exchangeRealMedal(item)" :class="{
                  'submit-button':
                    !item.hasExchange && item.haveNum >= item.cost,
                  'submit-button-disabled':
                    item.hasExchange || item.haveNum < item.cost,
                }" type="button" plain>
                  兑&nbsp;换
                </button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <van-dialog use-slot @close="handleCloseDialog" @confirm="handleConfirm" show-cancel-button :show="showDialog"
      title="兑换确认" id="van-dialog">
      <view class="van-dialog__content">{{ content }}</view>
    </van-dialog>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  pageInfoVirtualMedal,
  pageInfoRealMedal,
  exchangeVirtualMedal,
  exchangeRealMedalApi,
} from "@/medal/api";
import { getUserInfoByOpenId } from "@/api/account";
import { onLoad } from "@dcloudio/uni-app";
import config from "@/config";
let info = ref(null);
let activeTab = ref("电子勋章");
let showDialog = ref(false);
let content = ref("");
let entityList = ref([]);
let medalList = ref([]);
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
  if (tab === "电子勋章") {
    getMedalList();
  } else {
    getRealMedalList();
  }
};
const routeTo = (item: any) => {
  console.log(item);
  uni.navigateTo({
    url: item.url,
  });
};
let nowExchange = ref({});
const exchangeMedal = (item: any) => {
  console.log(item);
  content.value = `确认消耗${item.cost}积分兑换该勋章？`;
  console.log(content.value);
  nowExchange.value = item;
  showDialog.value = true;
};
const exchangeRealMedal = (item: any) => {
  console.log(item);
  content.value = `确认消耗${item.cost}个电子勋章兑换该勋章？`;
  console.log(content.value);
  nowExchange.value = item;
  showDialog.value = true;
};
const handleCloseDialog = () => {
  showDialog.value = false;
  nowExchange.value = {};
};
const handleConfirm = async () => {
  console.log(nowExchange.value);
  const isRealMedal = Object.keys(nowExchange.value).indexOf("time") === -1;
  console.log(isRealMedal);
  // TODO: 调用兑换接口
  try {
    let res;
    if (isRealMedal) {
      console.log("兑换实物勋章");
      res = await exchangeRealMedalApi({
        wxId: uni.getStorageSync("uuid"),
        needNum: nowExchange.value.cost,
        realMedalId: nowExchange.value.id,
        realMedalName: nowExchange.value.name,
        virtualMedalId: nowExchange.value.virtualMedalId,
      });
    } else {
      res = await exchangeVirtualMedal({
        wxId: uni.getStorageSync("uuid"),
        needScore: nowExchange.value.cost,
        virtualMedalId: nowExchange.value.id,
        virtualMedalName: nowExchange.value.name,
      });
    }
    console.log(res);
    uni.showToast({
      title: "兑换成功",
      icon: "success",
    });
  } catch (error) {
    console.log(error);
  } finally {
    showDialog.value = false;
    nowExchange.value = {};
    getUserInfoFunc();
    getMedalList();
    getRealMedalList();
  }
};
const getMedalList = async () => {
  try {
    let res = await pageInfoVirtualMedal({
      wxId: uni.getStorageSync("uuid"),
    });
    medalList.value = res.list.map((item: any) => ({
      id: item.id,
      name: item.virtualMedalName,
      cost: item.needScore,
      haveExchange: item.userIsHave,
      time: item.createTime,
      img:
        config.fileUrl +
        JSON.parse(item.virtualMedalImg)[0].url.replace(/\\/g, "/"),
    }));
    console.log(medalList.value);
  } catch (error) {
    console.log(error);
  }
};
const getRealMedalList = async () => {
  try {
    let res = await pageInfoRealMedal({
      wxId: uni.getStorageSync("uuid"),
    });
    console.log(res);
    entityList.value = res.list.map((item: any) => ({
      name: item.realMedalName,
      describe: item.realMedalDesc,
      cost: item.needNum,
      hasExchange: item.userIsHave,
      id: item.id,
      virtualMedalId: item.virtualMedalId,
      img:
        config.fileUrl +
        JSON.parse(item.realMedalImg)[0].url.replace(/\\/g, "/"),
      haveNum: item.userHaveNum,
    }));
  } catch (error) {
    console.log(error);
  }
};
const getUserInfoFunc = async () => {
  try {
    let res1 = await getUserInfoByOpenId({
      wxId: uni.getStorageSync("uuid"),
    });
    console.log({ res123123: res1 });
    info.value = res1;
    recordList.value[0].value = res1.remainScore || 0;
    recordList.value[1].value = res1.virtualMedalNum || 0;
    recordList.value[2].value = res1.medalTicketNum || 0;
  } catch (error) { }
};
onLoad(() => {
  getUserInfoFunc();
  getMedalList();
});
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
          bottom: 0rpx;
          /* 横线距离 div 底部的位置 */
          left: 50%;
          /* 横线水平居中 */
          transform: translateX(-50%);
          /* 微调居中位置 */
          width: 50%;
          /* 横线长度为父 div 的一半（可自定义） */
          height: 4rpx;
          /* 横线粗细 */
          background: #04a634;
          /* 横线颜色 */
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

        >image {
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
        position: relative;

        .need-change {
          filter: contrast(0.8) grayscale(1);
          /* 可叠加亮度调整 */
        }

        .submit-button {
          width: 100%;
          height: 56rpx;
          border-radius: 8rpx;
          color: #ffffff;
          line-height: 56rpx;
          background-color: #3bb872;
          border: none;
          position: absolute;
          width: 160rpx;
          top: 100rpx;
        }

        &-pic {
          width: 160rpx;
          height: 160rpx;
          display: flex;
          align-items: center;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
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
