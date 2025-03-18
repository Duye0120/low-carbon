<template>
  <scroll-view scroll-x :scroll-left="scrollLeft" class="page-content">
    <view class="map-image">
      <image
        v-for="(item, index) in mapPoints"
        :key="item.name"
        @touchstart="onFocus(item)"
        @touchend="removeFocus(item)"
        @touchcancel="removeFocus(item)"
        :style="{
          top: `${item.y}rpx`,
          left: `${item.x}rpx`,
          width: `${item.width}rpx`,
        }"
        :class="['clickView', onFocusView === item.name ? 'focused' : '']"
        :src="item.src"
        mode="widthFix"
      >
      </image>
    </view>
    <view class="user-info">
      <view class="avatar-wrapper">
        <image
          class="avatar"
          :src="
            info
              ? info.headImg
                ? config.fileUrl + info.headImg
                : '/static/avatar.png'
              : '/static/avatar.png'
          "
          mode="aspectFill"
        ></image>
      </view>
      <view class="user-details">
        <view class="username">{{ info ? info.userName : "游客" }}</view>
        <view class="points">{{ scoreName(info ? info.remainScore : 0) }}</view>
      </view>
    </view>
    <view class="page-content-menu">
      <view class="page-content-menu-btnLine">
        <!-- <button @click="openLowCarbon" v-if="true" class="open-btn" type="button" plain>
          开启低碳之旅
          <image src="/static/next.png" mode="widthFix"></image>
        </button> -->
        <image
          v-if="showLowCarbon"
          class="ball"
          src="/static/generate-report.png"
          mode="aspectFit"
          @tap="add"
        ></image>
      </view>
      <view class="page-content-menu-top">
        <view
          @click="navigatorTo('每日任务')"
          class="page-content-menu-top-afterBoard"
          >每日任务</view
        >
        <view @click="navigatorTo('场景切换')">场景切换</view>
      </view>
      <view class="page-content-menu-bottom">
        <view
          @click="navigatorTo('个人中心')"
          class="page-content-menu-top-afterBoard"
          >个人中心</view
        >
        <view
          @click="navigatorTo('我的勋章')"
          class="page-content-menu-top-afterBoard"
          >我的勋章</view
        >
        <view @click="navigatorTo('积分规则')">积分规则</view>
      </view>
    </view>

    <van-popup
      :show="popupVisible"
      closeable
      round
      position="bottom"
      custom-style="height: 80%; overflow:visible;border-radius: 40rpx 40rpx 0rpx 0rpx;"
      @close="closePopup"
    >
      <view class="popup-content">
        <view class="popup-title">场景切换</view>
        <view class="popup-scene">
          <SceneContent
            type="popup"
            v-on:enterScene="enterScene"
            v-on:close-popup="closePopup"
          />
        </view>
      </view>
    </van-popup>
    <!-- 签到弹窗组件 -->
    <SignInOverlay
      v-if="showSignInOverlay"
      v-model:show="showSignInOverlay"
      @close="handleCloseSignIn"
      @sign-in="handleSignIn"
    />
    <van-dialog
      use-slot
      @close="handleCloseDialog"
      @confirm="handleConfirm"
      show-cancel-button
      :show="showDialog"
      title="开启低碳之旅？"
      id="van-dialog"
    >
      <view class="van-dialog__content">确认进入任务点位开启低碳之旅？</view>
    </van-dialog>
  </scroll-view>
  <view
    v-if="showUsePrompt"
    class="use-prompt1"
    :style="{
      backgroundImage: `url(https://df-wechat.app.atonal.cn/fileupload/static/step${step}.png)`,
    }"
  >
    <image
      v-if="step === 1"
      @click="nextStep"
      class="next-step1"
      src="/static/step1.png"
      mode="widthFix"
    ></image>
    <image
      v-if="step === 2"
      @click="nextStep"
      class="next-step2"
      src="/static/step2.png"
      mode="widthFix"
    ></image>
  </view>
</template>

<script setup lang="ts">
let showUsePrompt = ref(false);
import { ref, reactive, getCurrentInstance } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import SignInOverlay from "@/components/SignInOverlay.vue";
import config from "@/config";
import { scoreName } from "./api/scoreName";
import SceneContent from "@/components/SceneContent.vue";
import { getUserInfoByOpenId } from "@/api/account";
import { pageInfoPoint } from "./api/index";
import type { PointItem } from "./api/index";
const showSignInOverlay = ref(false);
let showLowCarbon = ref(false);
let scrollLeft = ref(0);
let showDialog = ref(false);
let step = ref(1);
let info = ref<any>(null);
let onFocusView = ref("");
const popupVisible = ref(false);
// 地图上的点位数据
const mapPoints = ref([
  {
    key: "hydrogenVehicle",
    name: "乘坐氢能交通",
    src: "/static/czqnjt.png",
    x: 1926,
    y: 410,
    width: 134,
  },
  {
    key: "gasElectricity",
    name: "发电步道发电",
    src: "/static/fdbdfd.png",
    x: 2076,
    y: 308,
    width: 166,
  },
  {
    key: "water",
    name: "喝海露纯净水",
    src: "/static/hhlcjs.png",
    x: 1890,
    y: 740,
    width: 178,
  },
  {
    key: "bike",
    name: "体验零碳单车",
    src: "/static/tyltdc.png",
    x: 2186,
    y: 498,
    width: 152,
  },
  {
    key: "zeroCarbonHouse",
    name: "零碳小屋",
    src: "/static/ltxw.png",
    x: 1908,
    y: 578,
    width: 130,
  },
]);
let winWidth = ref(0);
let winHeight = ref(0);
const add = (e: any) => {
  showLowCarbon.value = false;
  uni.setStorageSync("showLowCarbon", false);
  uni.navigateTo({
    url: "/report/views/index",
  });
};
const navigatorTo = (item: string) => {
  console.log(item);
  switch (item) {
    case "每日任务":
      showSignInOverlay.value = true;
      break;
    case "场景切换":
      showPopup();
      break;
    case "排行榜":
      uni.navigateTo({ url: `/main/index?tab=ranking` });
      break;
    case "个人中心":
      uni.navigateTo({ url: `/user/views/index` });
      break;
    case "我的勋章":
      uni.navigateTo({ url: `/medal/views/index` });
      break;
    case "积分规则":
      uni.navigateTo({ url: `/pages/integral-rule` });
      break;
    case "资讯中心":
      uni.navigateTo({ url: `/news/views/index` });
      break;
  }
};
let openTaskItem = ref({});
const onFocus = (item: { name: string; id: string }) => {
  console.log(item, "onFocus");
  onFocusView.value = item.name;
  openTaskItem.value = item;
};
let isScene = ref(false);
const removeFocus = (item: { name: string; id: string }) => {
  onFocusView.value = "";
  if (!showLowCarbon.value) {
    showDialog.value = true;
  } else {
    uni.navigateTo({
      url: `/main/index?tab=task&pointId=${openTaskItem.value.id}&type=${openTaskItem.value.name}`,
    });
    if (!isScene.value) {
      saveSceneAndEmitEvent(openTaskItem.value);
    }
    openTaskItem.value = {};
  }
};
const enterScene = (scene: { realId: string; title: string }) => {
  console.log(scene, "enterScene");
  isScene.value = true;
  if (!showLowCarbon.value) {
    showDialog.value = true;
    openTaskItem.value = {
      id: scene.realId,
      name: scene.title,
    };
  } else {
    uni.navigateTo({
      url: `/main/index?tab=scene&pointId=${scene.realId}&type=${scene.title}`,
    });
    isScene.value = false;
    openTaskItem.value = {};
  }
};
const handleCloseDialog = () => {
  console.log("handleCloseDialog");
  showDialog.value = false;
  isScene.value = false;
  openTaskItem.value = {};
};
const handleConfirm = () => {
  console.log("handleConfirm");
  showDialog.value = false;
  uni.navigateTo({
    url: `/main/index?tab=${isScene.value ? "scene" : "task"}&pointId=${
      openTaskItem.value.id
    }&type=${openTaskItem.value.name}`,
  });
  if (!isScene.value) {
    saveSceneAndEmitEvent({
      key: openTaskItem.value.key,
      title: openTaskItem.value.name,
      realId: openTaskItem.value.id,
    });
  }
  isScene.value = false;
  openTaskItem.value = {};
  showLowCarbon.value = true;
  uni.setStorageSync("showLowCarbon", true);
};
const saveSceneAndEmitEvent = async (scene: { key: string; title: string; realId: string }) => {
  console.log(scene, "saveSceneAndEmitEvent")
  // 先存储数据
  uni.setStorage({
    key: "SceneContent",
    data: scene.key,
    success: function () {
      console.log("场景数据存储成功");
      // 存储成功后发送事件
      setTimeout(() => {
        uni.$emit("sceneChange", scene);
        console.log("已发送场景变化事件:", scene.key);
      }, 100);
    },
  });
  console.log(uni.getStorageSync("SceneContent"));
};
const nextStep = () => {
  if (step.value === 1) {
    step.value = 2;
  } else {
    showUsePrompt.value = false;
  }
};
const rpxToPx = (rpx: number) => {
  return rpx * (uni.getSystemInfoSync().windowWidth / 750);
};
const showPopup = () => {
  popupVisible.value = true;
};
const closePopup = () => {
  popupVisible.value = false;
};
// 处理关闭签到弹窗
const handleCloseSignIn = () => {
  showSignInOverlay.value = false;
};
// 处理签到
const handleSignIn = (day: number) => {
  console.log("用户已签到", day, "天");
  // 记录签到日期
  const today = new Date().toDateString();
  uni.setStorageSync("lastSignInDate", today);
  // 这里可以添加其他签到后的逻辑，如积分增加等
};
const getPointList = async () => {
  try {
    let res = await pageInfoPoint({
      pageNum: 1,
      pageSize: 12,
    });
    mapPoints.value.forEach((item) => {
      item.id =
        res.list.find((i: PointItem) => i.pointName === item.name)?.id || "";
    });
  } catch (error) {}
};
const getUserInfoFunc = async () => {
  try {
    let res1 = await getUserInfoByOpenId({
      wxId: uni.getStorageSync("uuid"),
    });
    console.log({ res123123: res1 });
    info.value = res1;
  } catch (error) {}
};
onLoad(async (query) => {
  console.log(query);
  showUsePrompt.value = query.showUsePrompt === "true";
  getUserInfoFunc();
  const { windowWidth, windowHeight } = uni.getSystemInfoSync();
  winWidth.value = windowWidth;
  winHeight.value = windowHeight;
  scrollLeft.value = rpxToPx(1700);
  getPointList();
  // #ifdef MP-WEIXIN
  // wx.getWeRunData({
  //   success(res) {
  //     console.log({ res });
  //     // 拿 encryptedData 到开发者后台解密开放数据
  //     const encryptedData = res.encryptedData;
  //     // 或拿 cloudID 通过云调用直接获取开放数据
  //     const cloudID = res.cloudID;
  //   },
  // });
  // #endif
});
onShow(() => {
  showLowCarbon.value = uni.getStorageSync("showLowCarbon") || false;
});
</script>

<style lang="scss" scoped>
.next-step1 {
  position: absolute;
  bottom: 270rpx;
  left: 200rpx;
  width: 360rpx;
}
.next-step2 {
  position: absolute;
  bottom: 210rpx;
  left: 200rpx;
  width: 360rpx;
}
.use-prompt1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.page-content {
  height: 100%;
  width: 100%;
  position: relative;
  .map-image {
    width: 3340rpx;
    height: 1624rpx;
    z-index: 0;
    background-image: url("https://df-wechat.app.atonal.cn/fileupload/static/map.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    .clickView {
      transition: transform 0.2s ease;
      will-change: transform;
      position: absolute;
    }
  }
  &-menu {
    position: fixed;
    bottom: 0;
    padding: 22rpx 44rpx 40rpx 44rpx;
    width: calc(100% - 88rpx);
    color: #fff;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.04) 1%,
      rgba(0, 0, 0, 0.14) 5%,
      #000000 100%
    );
    &-btnLine {
      height: 136rpx;
      margin-bottom: 106rpx;
      > .open-btn {
        width: 480rpx;
        height: 136rpx;
        background: #ffffff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        > image {
          width: 86rpx;
          margin-left: 36rpx;
        }
      }
      .ball {
        width: 116rpx;
        height: 118rpx;
        float: right;
      }
    }

    &-top {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      height: 124rpx;
      text-align: center;
      line-height: 124rpx;

      &-afterBoard {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          right: 0;
          /* 定位到右侧 */
          top: 50%;
          /* 垂直居中 */
          transform: translateY(-50%);
          /* 微调居中位置 */
          width: 1px;
          /* 边框粗细 */
          height: 50%;
          /* 边框高度为父元素的 50% */
          background: rgba(255, 255, 255, 0.3);
          /* 边框颜色 */
        }
      }
    }

    &-bottom {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      height: 70rpx;
      text-align: center;
      line-height: 70rpx;
    }
  }
}
.user-info {
  position: fixed;
  top: 160rpx;
  left: 32rpx;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: rgba(255, 255, 255, 0.8); */
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
}

.avatar-wrapper {
  width: 102rpx;
  height: 102rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10rpx;
  background-color: #fff;
  position: absolute;
  left: 0;
  z-index: 2;
}

.avatar {
  width: 100%;
  height: 100%;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  height: 90rpx;
  width: fit-content;
  padding: 0 35rpx 0 100rpx;
  border-radius: 45rpx;
  z-index: 1;
}

.username {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 4rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
}

.points {
  font-size: 24rpx;
  color: #38b868;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
}
.focused {
  transform: scale(1.1);
  /* 通过缩放实现放大 */
}

.popup-content {
  padding: 80rpx 20rpx 20rpx 20rpx;
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(
    180deg,
    #93dea6 0%,
    #d8eede 14%,
    #f4f5f4 22%,
    #f5f5f5 100%
  );
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  box-sizing: border-box;
}

.popup-title {
  font-size: 32rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #016629;
  width: 370rpx;
  height: 76rpx;
  position: absolute;
  top: -38rpx;
  left: 50%;
  transform: translateX(-50%);
  background-image: url("../static/popup-change-scene.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999999999;
}

.popup-scene {
  width: 100%;
  height: 100%;
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
