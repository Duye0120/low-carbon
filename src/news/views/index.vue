<template>
  <view class="page-wrapper">
    <scroll-view
      :show-scrollbar="false"
      scroll-y="true"
      class="page-wrapper-content"
    >
      <view @click="toDetail(item)" class="new-item" v-for="item in newsList" :key="item.id">
        <image class="new-item-imgs" :src="item.imgs" mode="aspectFill"></image>
        <view class="new-item-content">{{ item.content }}</view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let newsList = ref([
  {
    imgs: "/static/logo.png",
    content:
      "工信部：到2027年发布并实施100项以工信部：到2027年发布并实施100项以",
    id: "",
  },
  {
    imgs: "/static/logo.png",
    content:
      "工信部：到2027年发布并实施100项以工信部：到2027年发布并实施100项以",
    id: "",
  },
  {
    imgs: "/static/logo.png",
    content:
      "工信部：到2027年发布并实施100项以工信部：到2027年发布并实施100项以",
    id: "",
  },
  {
    imgs: "/static/logo.png",
    content:
      "工信部：到2027年发布并实施100项以工信部：到2027年发布并实施100项以",
    id: "",
  },
  {
    imgs: "/static/logo.png",
    content:
      "工信部：到2027年发布并实施100项以工信部：到2027年发布并实施100项以",
    id: "",
  },
  {
    imgs: "/static/logo.png",
    content:
      "工信部：到2027年发布并实施100项以工信部：到2027年发布并实施100项以",
    id: "",
  },
]);
const toDetail = (item) => {
  uni.navigateTo({
    url: `/news/views/detail?id=${item.id}`,
  });
}
</script>

<style scoped lang="scss">
.page-wrapper {
  padding: 40rpx;
  height: calc(100% - 80rpx);
  width: calc(100% - 80rpx);
  background: #f1f8ff;
  &-content {
    height: 100%;
    width: 100%;
    .new-item {
      background: #fff;
      margin-bottom: 40rpx;
      border-radius: 32rpx 32rpx 8rpx 8rpx;
      &-imgs {
        width: 100%;
        height: 300rpx;
        border-radius: 32rpx 32rpx 0px 0px;
      }
      &-content {
        border-radius: 0px 0px 8rpx 8rpx;
        box-shadow: 0px 2rpx 4rpx 0px rgba(0, 0, 0, 0.22);
        background: #fafafa;
        // 不换行 超过显示省略号
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 24rpx;
      }
    }
  }
}
</style>
