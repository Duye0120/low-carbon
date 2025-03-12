<template>
  <view class="login-container">
    <view class="logo">
      <image src="/static/login-avatar.png" mode="aspectFit"></image>
    </view>
    <view class="title">零碳小精灵</view>

    <view class="agreement">
      <checkbox-group @change="handleAgreementChange">
        <label class="checkbox-label">
          <checkbox
            value="agree"
            :checked="isAgreed"
            color="#07c160"
            style="transform: scale(0.7)"
          />
          <text>我已阅读并同意</text>
          <text class="link" @click="showTerms">《用户协议》</text>
          <text>和</text>
          <text class="link" @click="showTerms">《隐私政策》</text>
        </label>
      </checkbox-group>
    </view>
    <button
      class="login-btn"
      :class="{ 'login-btn-disabled': !isAgreed }"
      type="button"
      @click="openPopup"
      :disabled="!isAgreed"
    >
      进入零碳小精灵
    </button>

    <van-popup
      :show="popupVisible"
      round
      position="bottom"
      custom-style="height: 35%;padding: 30rpx"
      @close="closePopup"
    >
      <view class="popup-content">
        <view class="popup-title">
          <image mode="widthFix" src="/static/login-avatar.png" />
          <view class="popup-title-text">零碳小精灵&nbsp;申请</view>
        </view>
        <view class="popup-describe">
          <view class="popup-describe-top">获取您的昵称和头线</view>
          <view class="popup-describe-bottom"
            >在"我的"页面中展示昵称和头线</view
          >
        </view>
        <view class="popup-line">
          <view class="popup-line-label">头像</view>
          <image
            style="width: 82rpx"
            mode="widthFix"
            :src="avatarURL ? avatarURL : '/static/avatar.png'"
          />
        </view>
        <view class="popup-line">
          <view class="popup-line-label">昵称</view>
          <input
            @input="inputChange"
            type="nickname"
            class="weui-input"
            placeholder="请输入昵称"
          />
        </view>
        <view class="popup-buttonLine">
          <button
            @click="closePopup"
            class="refuseDisabled"
            type="button"
            plain
          >
            拒绝
          </button>
          <button
            :loading="loading"
            @click="handleLogin"
            :class="formActive ? 'allowd' : 'allowDisabled'"
            class="submit-button"
            type="button"
            plain
          >
            允许
          </button>
        </view>
      </view>
    </van-popup>
    <van-dialog use-slot :show="show" :show-confirm-button="false">
      <view style="padding: 32rpx">
        <agreement :index="index" />
        <view class="dialog-buttonLine">
          <button @click="closeDialog" type="button" class="cancel" plain>
            拒绝
          </button>
          <button @click="handleAgreement" type="button" class="allowd" plain>
            {{ index === 0 ? "继续" : "同意" }}
          </button>
        </view>
      </view>
    </van-dialog>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { getOpenId, getToken } from "@/api/account";
import agreement from "./components/agreement.vue";
import config from "@/config.ts";
import { ref } from "vue";
let index = ref(0);
let avatarURL = ref("");
const loading = ref(false);
const isAgreed = ref(false);
const popupVisible = ref(false);
let formActive = ref(false);
let show = ref(false);
let nickName = ref("");
let openid = ref("");

const closePopup = () => {
  popupVisible.value = false;
};

const openPopup = () => {
  popupVisible.value = true;
};

// 处理协议同意状态变更
const handleAgreementChange = () => {
  isAgreed.value = false;
  showTerms();
};

const closeDialog = () => {
  show.value = false;
  isAgreed.value = false;
  index.value = 0;
};

// 显示用户协议
const showTerms = () => {
  console.log("showTerms", show.value);
  index.value = 0;
  show.value = true;
  console.log("showTerms", show.value);
};

const inputChange = (e: any) => {
  console.log(e);
  formActive.value = e.detail.value.length > 0;
  nickName.value = e.detail.value;
};

// const onChooseAvatar = (e: any) => {
//   console.log(e);
//   const { avatarUrl } = e.detail;
//   avatarURL.value = avatarUrl;
//   let fileName = avatarUrl.split("/").pop();
//   uni.uploadFile({
//     url: config.baseUrl + "/file/upload", // 上传地址
//     name: "file",
//     filePath: avatarUrl,
//     formData: {
//       code: "sys",
//       menu: "小程序",
//     },
//     success: (res: any) => {
//       console.log(res);
//       if (res.statusCode === 200) {
//         let data = JSON.parse(res.data);
//         let url = data.data.url.replace(/[\\]/g, "/");
//         avatarURL.value = config.fileUrl + url;
//       } else {
//       }
//     },
//     fail: () => {},
//   });
// };
const handleAgreement = () => {
  console.log(index.value);
  if (index.value === 1) {
    isAgreed.value = true;
    show.value = false;
    return;
  }
  index.value++;
};
// 处理登录
const handleLogin = async () => {
  if (!formActive.value) return;
  if (!isAgreed.value) {
    uni.showToast({
      title: "请先同意用户协议和隐私政策",
      icon: "none",
    });
    return;
  }
  // 使用微信登录
  loading.value = true;
  let res = await getToken({
    headImg: "/static/avatar.png",
    userName: nickName.value,
    wxId: openid.value,
  });
  console.log(res);
  loading.value = false;
  if (res) {
    uni.setStorageSync("authorization", res);
    uni.navigateTo({ url: "/pages/index" });
  }
};
onLoad(() => {
  uni.login({
    provider: "weixin",
    success: function (loginRes) {
      getOpenId({
        js_code: loginRes.code,
      }).then((res) => {
        openid.value = res.openid;
        uni.setStorageSync("uuid", res.openid);
      });
    },
    fail: function () {
      uni.showToast({
        title: "登录失败，请重试",
        icon: "none",
      });
    },
  });
});
</script>

<style lang="scss" scoped>
.login-container {
  padding: 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 120rpx);
  background-color: #f8f8f8;

  .logo {
    width: 180rpx;
    height: 180rpx;
    margin-bottom: 40rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    font-size: 48rpx;
    margin-bottom: 20rpx;
    color: #000;
    padding-bottom: 380rpx;
  }

  .subtitle {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 80rpx;
  }

  .login-btn {
    width: 80%;
    height: 90rpx;
    border-radius: 8rpx;
    font-size: 32rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    margin-top: 40rpx;
    background-color: #07c160;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .login-btn-disabled {
    background-color: #ccc;
    color: #fff;
  }

  .agreement {
    font-size: 22rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;

    color: #999;
    display: flex;
    align-items: center;

    .checkbox-label {
      display: flex;
      align-items: center;
    }
    .link {
      color: #52c41a;
      margin: 0 4rpx;
    }
  }
}

.popup-content {
  .popup-title {
    display: flex;
    align-items: center;

    > image {
      width: 40rpx;
      margin-right: 16rpx;
    }

    &-text {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #000000;
    }
  }

  .popup-describe {
    margin-top: 56rpx;

    &-top {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #000000;
    }

    &-bottom {
      margin-top: 6rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 22rpx;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .popup-line {
    display: flex;
    align-items: center;
    margin-top: 36rpx;

    &-label {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
      margin-right: 60rpx;
    }

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
  }
}
.dialog-buttonLine {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  margin-top: 60rpx;
  .allowd {
    border: none;
    height: 80rpx;
    width: 100%;
    background: #03c15f;
    border-radius: 8rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #ffffff;
    line-height: 80rpx;
    text-align: center;
  }
  .cancel {
    border: none;
    height: 80rpx;
    width: 100%;
    background: rgb(227, 242, 221);
    border-radius: 8rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: rgb(113, 188, 85);
    line-height: 80rpx;
    text-align: center;
  }
}
.popup-buttonLine {
  display: flex;
  margin-top: 28rpx;

  .refuseDisabled {
    border: none;
    width: 238rpx;
    height: 80rpx;
    background: #f2f2f2;
    border-radius: 4rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #1fbd6e;
    line-height: 80rpx;
    text-align: center;
  }

  .allowDisabled {
    border: none;
    width: 238rpx;
    height: 80rpx;
    background: #84caa6;
    border-radius: 4rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #ffffff;
    line-height: 80rpx;
    text-align: center;
  }

  .allowd {
    border: none;
    width: 238rpx;
    height: 80rpx;
    background: #03c15f;
    border-radius: 4rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #ffffff;
    line-height: 80rpx;
    text-align: center;
  }
}
</style>
