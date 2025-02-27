<template>
  <div class="ranking-top3">
    <div class="top-user-card" :class="`rank-${rank}`">
      <div class="avatar-container">
        <img :src="rankBg" alt="排名背景" class="rank-bg" />
        <img :src="avatar" alt="用户头像" class="avatar" />
      </div>
      <div class="user-info">
        <div class="user-name">{{ userName }}</div>
        <div class="user-points">{{ points }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed } from "vue";
import { IPropsType } from "./type.d";
import No1 from "../static/ranking/No1.svg";
import No2 from "../static/ranking/No2.svg";
import No3 from "../static/ranking/No3.svg";

const props = defineProps<IPropsType>();
const avatar = ref<string>(props.avatar);
const userName = ref<string>(props.userName);
const points = ref<number>(props.points);
const rank = ref<number>(props.rank);
const key = ref<string>(props.key);

// 根据排名选择对应的背景
const rankBg = computed(() => {
  switch (rank.value) {
    case 1:
      return No1;
    case 2:
      return No2;
    case 3:
      return No3;
    default:
      return No3;
  }
});
</script>

<style scoped lang="scss">
.ranking-top3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 10px; */
  height: 100%;
  width: 100%;

  .top-user-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-top: 24rpx;

    .avatar-container {
      position: relative;
      margin-bottom: 8px;
      width: 160rpx;
      height: 160rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .rank-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        z-index: 2;
        position: relative;
        top: -10px; /* 调整头像在背景中的位置 */
      }
    }

    .user-info {
      text-align: center;

      .user-name {
        font-size: 14px;
        color: #333;
        margin-bottom: 4px;
      }

      .user-points {
        font-size: 16px;
        color: #4caf50; /* 绿色积分 */
        font-weight: bold;
      }
    }
  }

  .rank-1 {
    padding-top: 0;
  }
}
</style>
