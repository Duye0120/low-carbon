<template>
  <view class="page-wrapper">
    <view class="img-wrapper">
      <image
        style="width: 100%"
        v-for="(item, index) in img"
        :key="index"
        :src="config.fileUrl + item.url.replace(/\\/g, '/')"
        mode="widthFix"
      ></image>
    </view>
    <van-count-down
      class="count-down"
      use-slot
      :time="limitSecond"
      @change="onChange"
    >
      <view class="count-down-text" v-if="timeData.seconds > 0"
        >倒计时{{ timeData.seconds }}秒后可领取奖励</view
      >
      <view class="count-down-text" v-else>恭喜您，已完成浏览</view>
    </van-count-down>
    <rich-text :nodes="content"></rich-text>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getArticleDetail, finishArticleTask } from "@/main/api";
import config from "@/config.ts";
let content = ref("");
let img = ref([]);
let articleId = ref("");
let pointId = ref("");
let limitSecond = ref(0);
let timeData = ref({
  seconds: 0,
});
const getDetail = () => {
  getArticleDetail({
    id: articleId.value,
  }).then(async (res) => {
    content.value = res.scanContent;
    img.value = res.scanImg ? JSON.parse(res.scanImg) : [];
    limitSecond.value = res.limitSecond * 1000;
    if (res.limitSecond === 0) {
      await finishTask();
      uni.showToast({
        title: "完成浏览，获得10点零碳积分",
        icon: "none",
      });
    }
  });
};
const onChange = async (e: any) => {
  try {
    console.log(e);
    timeData.value = e.detail;
    if (e.detail.seconds === 0 && e.detail.milliseconds === 0) {
      await finishTask();
      uni.showToast({
        title: "完成浏览，获得10点零碳积分",
        icon: "none",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
const finishTask = () => {
  return new Promise((resolve, reject) => {
    finishArticleTask({
      pointId: pointId.value,
      wxId: uni.getStorageSync("uuid"),
      articleId: articleId.value,
      rewardScore: 10,
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
onLoad((query) => {
  articleId.value = query.taskId;
  pointId.value = query.pointId;
  getDetail();
});
</script>

<style scoped lang="scss">
.page-wrapper {
  position: relative;
}

.count-down {
  position: absolute;
  top: 0;
  right: 0;
  height: 56rpx;
  background: rgba(0, 0, 0, 0.5);
}

.count-down-text {
  padding: 0 20rpx;
  width: 100%;
  height: 100%;
  line-height: 56rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #ffffff;
}
</style>
