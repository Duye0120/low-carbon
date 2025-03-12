<template>
  <view class="page-content">
    <view v-if="drawFinish" class="user-info">
      <view class="avatar-wrapper">
        <image
          class="avatar"
          :src="
            info
              ? info.headImg
                ? info.headImg
                : '/static/avatar.png'
              : '/static/avatar.png'
          "
          mode="aspectFill"
        ></image>
      </view>
      <view class="user-details">
        <view class="username">{{ info ? info.userName : "游客" }}</view>
        <view class="points">积分 304</view>
      </view>
    </view>
    <view class="page-content-map">
      <canvas
        class="map-image"
        canvas-id="firstCanvas"
        id="firstCanvas"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      ></canvas>
      <image
        v-for="(item, index) in mapPoints"
        :key="item.name"
        @touchstart="onFocus(item)"
        @touchend="removeFocus(item)"
        @touchcancel="removeFocus(item)"
        :style="{
          left: `${
            item.x * img.scale +
            (canvasSize.width - img.drawWidth) / 2 +
            offset.x
          }px`,
          top: `${
            item.y * img.scale +
            (canvasSize.height - img.drawHeight) / 2 +
            offset.y
          }px`,
        }"
        :class="[
          'clickView' + (index + 1),
          onFocusView === item.name ? 'focused' : '',
        ]"
        :src="item.src"
        mode=""
      >
      </image>
    </view>
    <view v-if="drawFinish" class="page-content-menu">
      <view class="page-content-menu-btnLine">
        <button @click="add" v-if="true" class="open-btn" type="button" plain>
          开启低碳之旅
          <image src="/static/next.png" mode="widthFix"></image>
        </button>
        <image
          v-else
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
          <SceneContent type="popup" v-on:close-popup="closePopup" />
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
    <!-- 模态弹窗 -->
    <van-popup ref="popupRef" position="bottom" round :show="false">
      <view> 获取您的昵称和头像 </view>
      <view> 在"个人中心"页面中展示昵称和头像 </view>
      <view>
        头像
        <image class="avatar" src="/static/avatar.png" />
      </view>
      <view
        >昵称
        <input type="nickname" class="weui-input" placeholder="请输入昵称" />
      </view>
    </van-popup>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref, onMounted, onUnmounted, reactive } from "vue";
import config from "@/config.ts";
import SignInOverlay from "@/components/SignInOverlay.vue";
import SceneContent from "@/components/SceneContent.vue";
import { getUserInfo } from "@/api/account";
import { pageInfoPoint } from "./api/index";
import type { PointItem } from "./api/index";

let onFocusView = ref("");
let winWidth = ref(0);
let winHeight = ref(0);
// 控制签到弹窗显示
const showSignInOverlay = ref(false);
const popupVisible = ref(false);

// 地图上的点位数据
const mapPoints = ref([
  { name: "乘坐氢能交通", src: "/static/czqnjt.png", x: 2350, y: 740 },
  { name: "发电步道发电", src: "/static/fdbdfd.png", x: 2320, y: 570 },
  { name: "喝海露纯净水", src: "/static/hhlcjs.png", x: 2200, y: 900 },
  { name: "体验零碳单车", src: "/static/tyltdc.png", x: 2450, y: 740 },
  { name: "零碳小屋", src: "/static/ltxw.png", x: 2250, y: 760 },
]);
const activePoint = ref<MapPoint | null>(null); // 当前激活的点位
let pointIconsLoaded = ref(false); // 点位图标加载状态

// 页面加载时显示签到弹窗
onMounted(() => {
  // 检查是否已经签到，如果没有则显示弹窗
  checkSignInStatus();
});

// onUnmounted(() => {
//   uni.removeStorageSync('lastSignInDate')
// })

// 检查签到状态
const checkSignInStatus = () => {
  // 这里可以添加检查本地存储或API调用来判断用户今天是否已经签到
  // 示例：简单使用本地存储判断
  const today = new Date().toDateString();
  const lastSignInDate = uni.getStorageSync("lastSignInDate");

  if (lastSignInDate !== today) {
    // 今天还没有签到，显示弹窗
    showSignInOverlay.value = false;
  }
};

// 处理签到
const handleSignIn = (day: number) => {
  console.log("用户已签到", day, "天");
  // 记录签到日期
  const today = new Date().toDateString();
  uni.setStorageSync("lastSignInDate", today);
  // 这里可以添加其他签到后的逻辑，如积分增加等
};

// 处理关闭签到弹窗
const handleCloseSignIn = () => {
  showSignInOverlay.value = false;
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
let info = ref<any>(null);
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
const add = (e: any) => {
  uni.navigateTo({
    url: "/report/views/index",
  });
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
onShow(async () => {
  if (uni.getStorageSync("info")) {
    info.value = uni.getStorageSync("info");
  } else {
    getUserInfoFunc();
  }
  getPointList();
  const { windowWidth, windowHeight } = uni.getSystemInfoSync();
  winWidth.value = windowWidth;
  winHeight.value = windowHeight;
  initCanvas();
  try {
    // tempPath.value = await loadImage();
    // 计算最大偏移
    offset.maxX = Math.max(0, (img.drawWidth - canvasSize.width) / 2);
    offset.maxY = Math.max(0, (img.drawHeight - canvasSize.height) / 2);
    console.log({ offset, tempPath: tempPath.value });
    await draw(tempPath.value);
  } catch (e) {
    uni.showToast({ title: `图片加载失败：${e}`, icon: "none" });
  }
});
// 响应式状态
const tempPath = ref("");
const ctx = ref(null);
const canvasSize = reactive({ width: 0, height: 0 });
const img = reactive({
  url: "https://df-wechat.app.atonal.cn/fileupload/static/map.png",
  width: 1080,
  height: 1080,
  drawWidth: 1080,
  drawHeight: 1080,
  scale: 1,
  loaded: false,
});
const offset = reactive({
  x: 0,
  y: 0,
  maxX: 0,
  maxY: 0,
  startX: 0,
  startY: 0,
});

// 初始化画布
const initCanvas = () => {
  const sys = uni.getSystemInfoSync();
  canvasSize.width = sys.windowWidth;
  canvasSize.height = sys.windowHeight;
  ctx.value = uni.createCanvasContext("firstCanvas", this);
};

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
              img.drawHeight = infoRes.height * 0.5;
              img.scale = img.drawHeight / infoRes.height;
              img.drawWidth = infoRes.width * img.scale;
              img.loaded = true;
              // 计算最大偏移量
              offset.maxX = Math.max(0, (img.drawWidth - canvasSize.width) / 2);
              offset.maxY = Math.max(
                0,
                (img.drawHeight - canvasSize.height) / 2
              );
              resolve(res.tempFilePath);
            },
          });
        }
      },
    });
  });
};
let drawFinish = ref(false);
// 整合绘制方法
const draw = async (tempPath) => {
  // if (!img.loaded) return;

  ctx.value.clearRect(0, 0, canvasSize.width, canvasSize.height);

  // 计算绘制位置
  const drawX = (canvasSize.width - img.drawWidth) / 2 + offset.x;
  const drawY = (canvasSize.height - img.drawHeight) / 2 + offset.y;

  ctx.value.drawImage(
    "/static/avatar.png",
    drawX,
    drawY,
    img.drawWidth,
    img.drawHeight
  );
  console.log("drawFinish1", drawFinish.value);
  ctx.value.draw();
  if (!drawFinish.value) {
    setTimeout(() => {
      drawFinish.value = true;
      console.log("drawFinish2", drawFinish.value);
    }, 5000);
  }
};

// 修改handleTouchStart
const handleTouchStart = (e) => {
  offset.startX = e.touches[0].pageX;
  offset.startY = e.touches[0].pageY;
};

// 修改handleTouchMove
const handleTouchMove = (e) => {
  if (!img.loaded || img.drawWidth <= canvasSize.width) return;

  const deltaX = e.touches[0].pageX - offset.startX;
  const deltaY = e.touches[0].pageY - offset.startY;

  offset.x = Math.max(-offset.maxX, Math.min(offset.maxX, offset.x + deltaX));
  offset.y = Math.max(-offset.maxY, Math.min(offset.maxY, offset.y + deltaY));

  offset.startX = e.touches[0].pageX;
  offset.startY = e.touches[0].pageY;
  draw(tempPath.value);
};

const handleTouchEnd = () => {
  offset.startX = 0;
  offset.startY = 0;
};
const showPopup = () => {
  popupVisible.value = true;
};
const closePopup = () => {
  popupVisible.value = false;
};
</script>

<style scoped lang="scss">
.page-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &-map {
    height: 100%;
    width: 100%;
    position: relative;

    .map-image {
      width: 100%;
      height: 100%;
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
    }

    .clickView3 {
      transition: transform 0.2s ease;
      // /* 使用transform代替width修改 */
      will-change: transform;
      // /* 预声明变化属性优化性能 */
      position: absolute;
      width: 108rpx;
      height: 84rpx;
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
      // top: 700rpx;
      // right: 270rpx;
    }
  }

  &-menu {
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
