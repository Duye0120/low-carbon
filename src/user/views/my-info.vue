<template>
  <view class="page-wrapper">
    <van-cell-group>
      <van-cell title="头像">
        <template #right-icon>
          <view>
            <image
              style="width: 64rpx; margin-right: 16rpx"
              mode="widthFix"
              :src="info ? config.fileUrl + info.headImg : '/static/avatar.png'"
            />
          </view>
        </template>
      </van-cell>
      <van-cell title="昵称">
        <template #right-icon>
          <view>{{ info?.userName || "" }}</view>
        </template>
      </van-cell>
    </van-cell-group>
  </view>
</template>

<script setup lang="ts">
import { getUserInfoByOpenId } from "@/api/account";
import { onShow } from "@dcloudio/uni-app";
import config from "@/config";
import { ref } from "vue";
let avatarUrl = ref("");
let info = ref<any>(null);
const onChooseAvatar = (e: any) => {
  console.log(e);
  avatarUrl.value = e.detail.avatarUrl;
};
const getUserInfoFunc = async () => {
  try {
    let res1 = await getUserInfoByOpenId({
      wxId: uni.getStorageSync("uuid"),
    });
    console.log({ res123123: res1 });
    info.value = res1;
  } catch (error) {
    console.log(error);
  }
};

onShow(() => {
  getUserInfoFunc();
});
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
