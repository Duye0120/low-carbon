<template>
    <view class="login-container">
        <view class="logo">
            <image src="/static/login-avatar.png" mode="aspectFit"></image>
        </view>
        <view class="title">零碳小精灵</view>


        <view class="agreement">
            <checkbox-group @change="handleAgreementChange">
                <label class="checkbox-label">
                    <checkbox value="agree" :checked="isAgreed" color="#07c160" style="transform: scale(0.7);" />
                    <text>我已阅读并同意</text>
                    <text class="link" @click="showTerms">《用户协议》</text>
                    <text>和</text>
                    <text class="link" @click="showPrivacy">《隐私政策》</text>
                </label>
            </checkbox-group>
        </view>
        <button class="login-btn" :class="{ 'login-btn-disabled': !isAgreed }" type="button" @click="openPopup"
            :disabled="!isAgreed">
            进入零碳小精灵
        </button>


        <van-popup :show="popupVisible" round position="bottom" custom-style="height: 35%;padding: 30rpx"
            @close="closePopup">
            <view class="popup-content">
                <view class="popup-title">场景切换</view>
                <view class="popup-scene">
                    content
                </view>
            </view>
        </van-popup>
        <!-- <view class="agreement">
            <checkbox-group @change="handleAgreementChange">
                <label class="checkbox-label">
                    <checkbox value="agree" :checked="isAgreed" color="#07c160" style="transform: scale(0.7);" />
                    <text>我已阅读并同意</text>
                    <text class="link" @click="showTerms">《用户协议》</text>
                    <text>和</text>
                    <text class="link" @click="showPrivacy">《隐私政策》</text>
                </label>
            </checkbox-group>
        </view> -->
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);
const isAgreed = ref(false);
const popupVisible = ref(false);

const closePopup = () => {
    popupVisible.value = false;
}

const openPopup = () => {
    popupVisible.value = true;
}

// 处理协议同意状态变更
const handleAgreementChange = (e: any) => {
    isAgreed.value = e.detail.value.length > 0;
};

// 显示用户协议
const showTerms = () => {
    uni.showModal({
        title: '用户协议',
        content: '这是用户协议内容...',
        showCancel: false
    });
};

// 显示隐私政策
const showPrivacy = () => {
    uni.showModal({
        title: '隐私政策',
        content: '这是隐私政策内容...',
        showCancel: false
    });
};

// 处理登录
const handleLogin = () => {
    if (!isAgreed.value) {
        uni.showToast({
            title: '请先同意用户协议和隐私政策',
            icon: 'none'
        });
        return;
    }

    loading.value = true;

    // 使用微信登录
    uni.login({
        provider: 'weixin',
        success: function (loginRes) {
            console.log('登录成功', loginRes);
            uni.reLaunch({
                url: '/pages/index'
            });
            // // 获取用户信息
            // uni.getUserProfile({
            //     desc: '用于完善会员资料',
            //     success: function (infoRes) {
            //         // 保存用户信息
            //         uni.setStorageSync('userInfo', infoRes.userInfo);
            //         uni.setStorageSync('token', 'mock-token-' + Date.now()); // 模拟token

            //         // 跳转到首页
            //         uni.reLaunch({
            //             url: '/pages/index'
            //         });
            //     },
            //     fail: function () {
            //         uni.showToast({
            //             title: '获取用户信息失败',
            //             icon: 'none'
            //         });
            //         loading.value = false;
            //     }
            // });
        },
        fail: function () {
            uni.showToast({
                title: '登录失败，请重试',
                icon: 'none'
            });
            loading.value = false;
        }
    });
};
</script>

<style lang="scss" scoped>
.login-container {
    padding: 60rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
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
            color: #52C41A;
            margin: 0 4rpx;
        }
    }
}
</style>