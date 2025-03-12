<template>
  <view class="page-content">
    <cover-view class="user-info">
      <cover-view class="avatar-wrapper">
        <cover-image
          class="avatar"
          :src="
            info
              ? info.headImg
                ? info.headImg
                : '/static/avatar.png'
              : '/static/avatar.png'
          "
          mode="aspectFill"
        ></cover-image>
      </cover-view>
      <cover-view class="user-details">
        <cover-view class="username">{{
          info ? info.userName : "游客"
        }}</cover-view>
        <cover-view class="points">积分 304</cover-view>
      </cover-view>
    </cover-view>
    <canvas
      class="map-image"
      canvas-id="firstCanvas"
      id="firstCanvas"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    ></canvas>
    <cover-image
      v-for="(item, index) in mapPoints"
      :key="item.name"
      @touchstart="onFocus(item)"
      @touchend="removeFocus(item)"
      @touchcancel="removeFocus(item)"
      :style="{
        left: `${
          item.x * img.scale + (winWidth - img.drawWidth) / 2 + offset.x
        }px`,
        top: `${
          item.y * img.scale + (winHeight - img.drawHeight) / 2 + offset.y
        }px`,
      }"
      :class="[
        'clickView' + (index + 1),
        onFocusView === item.name ? 'focused' : '',
      ]"
      :src="item.src"
      mode=""
    >
    </cover-image>
    <cover-view class="page-content-menu">
      <cover-view class="page-content-menu-btnLine">
        <cover-view
          @click="add"
          v-if="true"
          class="open-btn"
          type="button"
          plain
        >
          <cover-view class="text">开启低碳之旅</cover-view>
          <cover-image
            class="next"
            src="/static/next.png"
            mode="widthFix"
          ></cover-image>
        </cover-view>
        <cover-image
          v-else
          class="ball"
          src="/static/generate-report.png"
          mode="aspectFit"
          @tap="add"
        ></cover-image>
      </cover-view>
      <cover-view class="page-content-menu-top">
        <cover-view class="page-content-menu-crossborder top"></cover-view>
        <cover-view @click="navigatorTo('每日任务')" class="item1"
          >每日任务</cover-view
        >
        <cover-view class="item2" @click="navigatorTo('场景切换')"
          >场景切换</cover-view
        >
        <cover-view class="page-content-menu-crossborder middle"></cover-view>
      </cover-view>
      <cover-view class="page-content-menu-bottom">
        <cover-view class="page-content-menu-crossborder top"></cover-view>
        <cover-view @click="navigatorTo('个人中心')" class="item1"
          >个人中心</cover-view
        >
        <cover-view @click="navigatorTo('我的勋章')" class="item2"
          >我的勋章</cover-view
        >
        <cover-view class="item3" @click="navigatorTo('积分规则')"
          >积分规则</cover-view
        >
        <cover-view class="page-content-menu-crossborder bottom"></cover-view>
      </cover-view>
    </cover-view>

    <!-- <van-popup
      :show="popupVisible"
      closeable
      round
      position="bottom"
      custom-style="height: 80%; overflow:visible;border-radius: 40rpx 40rpx 0rpx 0rpx;"
      @close="closePopup"
    >
      <cover-view class="popup-content">
        <cover-view class="popup-title">场景切换</cover-view>
        <cover-view class="popup-scene">
          <SceneContent type="popup" v-on:close-popup="closePopup" />
        </cover-view>
      </cover-view>
    </van-popup> -->
    <!-- 签到弹窗组件 -->
    <SignInOverlay
      v-if="showSignInOverlay"
      v-model:show="showSignInOverlay"
      @close="handleCloseSignIn"
      @sign-in="handleSignIn"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import SignInOverlay from "@/components/SignInOverlay.vue";
// import SceneContent from "@/components/SceneContent.vue";
import OverLay from "@/components/over-lay/index.vue";
import { getUserInfo } from "@/api/account";
import { pageInfoPoint } from "./api/index";
import type { PointItem } from "./api/index";
const showSignInOverlay = ref(false);
let info = ref<any>({
  userName: "游客",
  headImg: "/static/avatar.png",
});
let onFocusView = ref("");
const popupVisible = ref(false);
// 地图上的点位数据
const mapPoints = ref([
  { name: "乘坐氢能交通", src: "/static/czqnjt.png", x: 2040, y: 375 },
  { name: "发电步道发电", src: "/static/fdbdfd.png", x: 2040, y: 290 },
  { name: "喝海露纯净水", src: "/static/hhlcjs.png", x: 1950, y: 480 },
  { name: "体验零碳单车", src: "/static/tyltdc.png", x: 2100, y: 380 },
  { name: "零碳小屋", src: "/static/ltxw.png", x: 1990, y: 400 },
]);
let winWidth = ref(0);
let winHeight = ref(0);
let tempPath = ref("");
const ctx = ref(null);
const img = reactive({
  url: "https://df-wechat.app.atonal.cn/fileupload/static/map.png",
  width: 0,
  height: 0,
  drawWidth: 0,
  drawHeight: 0,
  scale: 2,
  loaded: false,
});
const offset = reactive({
  x: -343,
  y: 364,
  maxX: 0,
  maxY: 0,
  startX: 0,
  startY: 0,
});
// 加载网络图片（关键修正）
const loadImage = () => {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: img.url,
      success: (res) => {
        if (res.statusCode === 200) {
          uni.getImageInfo({
            src: res.tempFilePath,
            success: (infoRes) => {
              img.width = infoRes.width;
              img.height = infoRes.height;
              img.drawHeight = infoRes.height * 1;
              img.scale = img.drawHeight / infoRes.height;
              img.drawWidth = infoRes.width * img.scale;
              img.loaded = true;
              // 计算最大偏移量
              offset.maxX = Math.max(0, (img.drawWidth - winWidth.value) / 2);
              offset.maxY = Math.max(0, (img.drawHeight - winHeight.value) / 2);
              resolve(res.tempFilePath);
            },
          });
        }
      },
    });
  });
};
// 整合绘制方法
const draw = async (tempPath) => {
  if (!img.loaded) return;

  ctx.value.clearRect(0, 0, winWidth.value, winHeight.value);

  // 计算绘制位置
  const drawX = (winWidth.value - img.drawWidth) / 2 + offset.x;
  const drawY = (winHeight.value - img.drawHeight) / 2 + offset.y;

  ctx.value.drawImage(tempPath, drawX, drawY, img.drawWidth, img.drawHeight);
  console.log("draw");
  ctx.value.draw();
};
// 修改handleTouchStart
const handleTouchStart = (e) => {
  offset.startX = e.touches[0].pageX;
  offset.startY = e.touches[0].pageY;
};

// 修改handleTouchMove
const handleTouchMove = (e) => {
  if (!img.loaded || img.drawWidth <= winWidth.value) return;

  const deltaX = e.touches[0].pageX - offset.startX;
  const deltaY = e.touches[0].pageY - offset.startY;

  offset.x = Math.max(-offset.maxX, Math.min(offset.maxX, offset.x + deltaX));
  offset.y = Math.max(-offset.maxY, Math.min(offset.maxY, offset.y + deltaY));

  offset.startX = e.touches[0].pageX;
  offset.startY = e.touches[0].pageY;
  console.log(offset);
  draw(tempPath.value);
};

const handleTouchEnd = () => {
  offset.startX = 0;
  offset.startY = 0;
};
const add = (e: any) => {
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
      uni.navigateTo({ url: `/integral/index` });
      break;
    case "资讯中心":
      uni.navigateTo({ url: `/news/views/index` });
      break;
  }
};
const onFocus = (item: { name: string; id: string }) => {
  console.log(item, "onFocus");
  onFocusView.value = item.name;
};
const removeFocus = (item: { name: string; id: string }) => {
  onFocusView.value = "";
  uni.navigateTo({
    url: `/main/index?tab=task&pointId=${item.id}&type=${item.name}`,
  });
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
    console.log("uuid", uni.getStorageSync("uuid"));
    let res = await getUserInfo();
    console.log({ res123123: res });
    info.value = res;
    uni.setStorageSync("info", info.value);
  } catch (error) {}
};
onLoad(async () => {
  if (uni.getStorageSync("info")) {
    info.value = uni.getStorageSync("info");
  } else {
    getUserInfoFunc();
  }
  getPointList();
  const { windowWidth, windowHeight } = uni.getSystemInfoSync();
  winWidth.value = windowWidth;
  winHeight.value = windowHeight;
  ctx.value = uni.createCanvasContext("firstCanvas", this);
  try {
    tempPath.value = await loadImage();
    // 计算最大偏移
    offset.maxX = Math.max(0, (img.drawWidth - winWidth.value) / 2);
    offset.maxY = Math.max(0, (img.drawHeight - winHeight.value) / 2);
    console.log({ offset, tempPath: tempPath.value });
    await draw(tempPath.value);
  } catch (e) {
    uni.showToast({ title: `图片加载失败：${e}`, icon: "none" });
  }
});
</script>

<style lang="scss" scoped>
.page-content {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .map-image {
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  &-menu {
    z-index: 2;
    padding: 22rpx 44rpx 40rpx 44rpx;
    width: calc(100% - 88rpx);
    position: absolute;
    bottom: 0;
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
      .open-btn {
        height: 136rpx;
        background: #ffffff;
        border: none;
        position: relative;
        margin: 0 80rpx;
        border-radius: 8rpx;
        .text {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 48rpx;
          color: #262626;
          position: absolute;
          top: 20px;
          left: 24px;
        }
        .next {
          width: 86rpx;
          position: absolute;
          right: 30px;
          top: 13px;
          height: 86rpx;
        }
      }
      .ball {
        width: 116rpx;
        height: 118rpx;
        float: right;
      }
    }
    &-top {
      height: 124rpx;
      text-align: center;
      line-height: 124rpx;
      position: relative;
      .item1 {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 40rpx;
        color: #ffffff;
        width: 50%;
        position: absolute;
        left: 0;
        border: none;
        text-align: center;
        line-height: 124rpx;
      }
      .item2 {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 40rpx;
        color: #ffffff;
        width: 50%;
        position: absolute;
        right: 0;
        border: none;
        text-align: center;
        line-height: 124rpx;
      }
    }
    &-bottom {
      height: 70rpx;
      text-align: center;
      line-height: 70rpx;
      position: relative;
      .item1 {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #ffffff;
        width: 33%;
        position: absolute;
        left: 0;
        text-align: center;
        line-height: 70rpx;
      }
      .item2 {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #ffffff;
        width: 33%;
        position: absolute;
        right: 33%;
        text-align: center;
        line-height: 70rpx;
      }
      .item3 {
        width: 33%;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #ffffff;
        position: absolute;
        right: 0;
        text-align: center;
        line-height: 70rpx;
      }
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
  }
}
.page-content-menu-crossborder {
  width: 100%;
  height: 2rpx;
  background: rgba(255, 255, 255, 0.3);
}
.top {
  position: absolute;
  top: 0;
}
.middle {
  position: absolute;
  top: 123rpx;
}
.bottom {
  position: absolute;
  bottom: 0;
}
.user-info {
  position: absolute;
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

.clickView1 {
  transition: transform 0.2s ease;
  // /* 使用transform代替width修改 */
  will-change: transform;
  // /* 预声明变化属性优化性能 */
  position: absolute;
  // top: 308rpx;
  // right: 106rpx;
  width: 96rpx;
  height: 94rpx;
  z-index: 2;
}

.clickView2 {
  transition: transform 0.2s ease;
  // /* 使用transform代替width修改 */
  will-change: transform;
  // /* 预声明变化属性优化性能 */
  position: absolute;
  // top: 362rpx;
  // right: 282rpx;
  width: 110rpx;
  height: 78rpx;
  z-index: 2;
}

.clickView3 {
  transition: transform 0.2s ease;
  // /* 使用transform代替width修改 */
  will-change: transform;
  // /* 预声明变化属性优化性能 */
  position: absolute;
  width: 108rpx;
  height: 84rpx;
  z-index: 2;
  // top: 430rpx;
  // right: 426rpx;
}

.clickView4 {
  transition: transform 0.2s ease;
  // /* 使用transform代替width修改 */
  will-change: transform;
  // /* 预声明变化属性优化性能 */
  position: absolute;
  width: 112rpx;
  height: 74rpx;
  z-index: 2;
  // top: 590rpx;
  // right: 368rpx;
}

.clickView5 {
  transition: transform 0.2s ease;
  // /* 使用transform代替width修改 */
  will-change: transform;
  // /* 预声明变化属性优化性能 */
  position: absolute;
  width: 84rpx;
  height: 104rpx;
  z-index: 2;
  // top: 700rpx;
  // right: 270rpx;
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
</style>
