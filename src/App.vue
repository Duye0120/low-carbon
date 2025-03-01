<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

// 检查登录状态
const checkLoginStatus = () => {
  const token = uni.getStorageSync('token');
  const userInfo = uni.getStorageSync('userInfo');

  if (!token || !userInfo) {
    // 未登录，跳转到登录页
    uni.reLaunch({
      url: '/pages/login'
    });
  }
};

// // 在应用启动或页面加载时调用
// onLaunch(() => {
// });
onLaunch(() => {
  checkLoginStatus();
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
uni-page-body {
  height: 100%;
}

page {
  height: 100%;
}
</style>
