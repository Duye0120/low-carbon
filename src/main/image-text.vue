<template>
  <view class="page-wrapper">
    <view class="img-wrapper">
      <image
        style="width: 100%;"
        v-for="(item, index) in img"
        :key="index"
        :src="config.fileUrl + item.url.replace(/\\/g, '/')"
        mode="widthFix"
      ></image>
    </view>
    <rich-text :nodes="content"></rich-text>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getArticleDetail } from "@/main/api";
import config from "@/config.ts";
let content = ref("");
let img = ref([]);
let articleId = ref("");
let pointId = ref("");
const getDetail = () => {
  getArticleDetail({
    id: articleId.value,
  }).then((res) => {
    console.log({ res })
    content.value = res.scanContent;
    img.value = res.scanImg ? JSON.parse(res.scanImg) : [];
  });
};
onLoad((query) => {
  articleId.value = query.taskId;
  pointId.value = query.pointId;
  getDetail();
});
</script>

<style scoped lang="scss"></style>
