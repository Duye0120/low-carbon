<template>
  <view class="page-wrapper">
    <view class="page-wrapper-header">
      <image
        style="height: 662rpx"
        mode="heightFix"
        src="./static/q&a-headerBg.png"
        alt=""
      />
    </view>
    <view class="page-wrapper-content">
      <view class="page-wrapper-content-question"
        >下列哪种物质不属于有害垃圾？</view
      >
      <view class="page-wrapper-content-answer">
        <!-- <button class="refuseDisabled" type="button" plain>
                        拒绝
                    </button>
                    
                    <button class="refuseDisabled" type="button" plain>
                        拒绝
                    </button> -->
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100%;
  height: 100%;
  &-header {
    width: 100%;
    // background: url("./static/q&a-headerBg.png") no-repeat center / 100% 100%;
    height: 662rpx;
    margin-bottom: -28rpx;
    position: relative;
    z-index: 1;
  }
  &-content {
    width: 100%;
    height: calc(100% - 634rpx);
    background: #ffffff;
    border-radius: 28rpx;
    z-index: 10;
    position: relative;
  }
}
</style>
