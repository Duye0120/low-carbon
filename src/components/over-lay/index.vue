<!-- components/mask-layer/mask-layer.vue -->
<template>
  <!-- 遮罩层容器 -->
  <cover-view
    v-if="show"
    class="mask-layer"
    :style="{
      zIndex: zIndex,
      backgroundColor: backgroundColor,
    }"
    @tap="handleClick"
  >
    <!-- 内容插槽（必须使用 cover-view/cover-image） -->
    <cover-view class="mask-content">
      <slot></slot>
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  name: "MaskLayer",
  props: {
    // 是否显示遮罩层
    show: {
      type: Boolean,
      default: false,
    },
    // 层级设置
    zIndex: {
      type: [Number, String],
      default: 999,
    },
    // 背景颜色（支持透明度）
    backgroundColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.6)",
    },
    // 是否可点击遮罩层关闭
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit("update:show", false);
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
.mask-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mask-content {
  /* 内容区域样式（可根据需要自定义） */
  position: relative;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}
</style>
