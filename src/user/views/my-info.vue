<template>
  <view class="page-wrapper">
    <van-cell-group>
      <van-cell title="头像">
        <template #right-icon>
          <button
            class="avatar-wrapper"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar"
          >
            <image
              style="width: 64rpx; margin-right: 16rpx"
              mode="widthFix"
              :src="avatarUrl ? avatarUrl : '/static/avatar.png'"
            />
            <van-icon name="arrow" />
          </button>
        </template>
      </van-cell>
      <van-cell title="昵称">
        <template #right-icon>
          <input type="nickname" class="weui-input" placeholder="请输入昵称"/>
        </template>
      </van-cell>
    </van-cell-group>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let avatarUrl = ref("");
const onChooseAvatar = (e: any) => {
  console.log(e);
  avatarUrl.value = e.detail.avatarUrl;
};
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  height: 100%;
  .avatar-wrapper {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    padding: 0;
    margin: 0;
    &::after {
      border: none;
    }
  }
  .weui-input {
    text-align: end;
  }
}
</style>
