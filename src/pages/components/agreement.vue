<template>
  <view class="title">{{ index === 0 ? "用户注册协议" : "隐私政策" }}</view>
  <view class="content" v-if="index === 0">
    <view
      >在此特别提醒您在注册成为《零碳小精灵》用户之前，请认真阅读本《零碳小精灵用户注册协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您同意并点击确认本协议条款完成注册程序后，才能成为《零碳小精灵》的正式注册用户，并享受《零碳小精灵》的各类服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。若您不同意本协议，或对本协议中的条款存在任何疑问，请您立即停止《零碳小精灵》用户注册程序，并可以选择不使用《零碳小精灵》服务。本协议条款是公司（以下称“我们”）对用户相关政策的许诺，请您务必仔细阅读。</view
    >
  </view>
  <view class="content" v-else>
    <view
      >在此特别提醒您在注册成为《零碳小精灵》用户之前，请认真阅读本《零碳小精灵用户注册协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您同意并点击确认本协议条款完成注册程序后，才能成为《零碳小精灵》的正式注册用户，并享受《零碳小精灵》的各类服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。若您不同意本协议，或对本协议中的条款存在任何疑问，请您立即停止《零碳小精灵》用户注册程序，并可以选择不使用《零碳小精灵》服务。本协议条款是公司（以下称“我们”）对用户相关政策的许诺，请您务必仔细阅读。</view
    >
  </view>
</template>

<script setup lang="ts">
let props = defineProps<{ index: number }>();
</script>

<style lang="scss" scoped>
.title {
  text-align: center; 
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 48rpx;
}
.content {
  height: 600rpx;
  overflow: auto;
  text-align: center;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
}
</style>
