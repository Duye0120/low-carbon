<template>
  <view class="page-wrapper">
    图文详情
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getArticleDetail } from "@/main/api";
let content = ref("");
let articleId = ref("");
let pointId = ref("");
const getDetail = () => {
  getArticleDetail({
    id: articleId.value,
  }).then((res) => {
    console.log({ res })
  });
};
onLoad((query) => {
  articleId.value = query.taskId;
  pointId.value = query.pointId;
  getDetail();
});
</script>

<style scoped lang="scss"></style>
