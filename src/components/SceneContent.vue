<template>
  <view class="scene-container">
    <view class="scene-grid">
      <view
        v-for="(scene, index) in scenes"
        :key="index"
        class="scene-item"
        :style="{
          backgroundColor: props.type === 'popup' ? '#fff' : '',
        }"
      >
        <image class="scene-image" :src="scene.image" mode="aspectFill"></image>
        <view class="scene-title">{{ scene.title }}</view>
        <view
          class="scene-button"
          :class="props.type === 'page' ? { active: scene.active } : ''"
          @click="
            props.type === 'page' ? switchScene(scene) : enterScene(scene)
          "
        >
          {{
            props.type === "page" ? (scene.active ? "已切换" : "切换") : "进入"
          }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { pageInfoPoint } from "@/pages/api/index";
import type { PointItem } from "@/pages/api/index";

const emit = defineEmits(["close-popup", "enterScene"]);

const props = defineProps({
  type: {
    type: String,
    default: "popup",
  },
  scenes: {
    type: Array,
    default: () => [],
  },
});

// 场景数据
const scenes = ref([
  {
    id: "hydrogenVehicle",
    title: "乘坐氢能交通",
    image: "../static/changeScene/hydrogenVehicle.png",
    active: false,
  },
  {
    id: "gasElectricity",
    title: "发电步道发电",
    image: "../static/changeScene/gasElectricity.png",
    active: false,
  },
  {
    id: "water",
    title: "喝海露纯净水",
    image: "../static/changeScene/water.png",
    active: false,
  },
  {
    id: "bike",
    title: "体验零碳单车",
    image: "../static/changeScene/bike.png",
    active: false,
  },
  {
    id: "zeroCarbonHouse",
    title: "零碳小屋",
    image: "../static/changeScene/zeroCarbonHouse.png",
    active: false,
  },
]);
let activeScene = ref(null);
// 切换场景
const switchScene = (scene: { id: string; title: string; image: string } | string) => {
  const sceneId = typeof scene === 'string' ? scene : scene.id;
  scenes.value.forEach((scene) => {
    scene.active = scene.id === sceneId;
  });
  saveSceneAndEmitEvent(scene);
};

// 进入场景
const enterScene = (scene: any) => {
  // 进入场景后关闭popup
  saveSceneAndEmitEvent(scene).then(() => {
    emit("close-popup");
    emit("enterScene", scene);
  });
};

// 提取共同逻辑：保存场景并发送事件
const saveSceneAndEmitEvent = async (scene: { id: string; title: string; realId: string }) => {
  // 先存储数据
  uni.setStorage({
    key: "SceneContent",
    data: scene.id,
    success: function () {
      console.log("场景数据存储成功");
      // 存储成功后发送事件
      setTimeout(() => {
        uni.$emit("sceneChange", scene);
        console.log("已发送场景变化事件:", scene.id);
      }, 100);
    },
  });
};

const getPointList = async () => {
  try {
    let res = await pageInfoPoint({
      pageNum: 1,
      pageSize: 12,
    });
    scenes.value.forEach((item) => {
      item.realId =
        res.list.find((i: PointItem) => i.pointName === item.title)?.id || "";
    });
    console.log(scenes.value, 'sceneContent');
  } catch (error) {}
};

onMounted(() => {
  uni.getStorage({
    key: "SceneContent",
    success: function (res) {
      if (res.data) {
        let item = scenes.value.find((i) => i.id === res.data);
        switchScene(item);
      }
    },
    fail: function () {
      let item = scenes.value.find((i) => i.id === "hydrogenVehicle");
      switchScene(item);
      console.log("未找到存储的场景ID，使用默认场景");
    },
  });
  getPointList();
});
</script>

<style scoped>
.scene-container {
  padding: 24rpx;
}

.scene-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.scene-item {
  background-color: #eff8f3;
  border-radius: 10rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx;
}

.scene-image {
  width: 100%;
  height: 160rpx;
  border-radius: 16rpx;
}

.scene-title {
  font-size: 28rpx;
  color: rgba(0, 0, 0, 0.85);
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  margin: 8rpx 0;
}

.scene-button {
  background: linear-gradient(270deg, #39b675 0%, #4bc352 100%);
  color: #fff;
  font-size: 28rpx;
  border-radius: 28rpx;
  width: 198rpx;
  height: 56rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scene-button.active {
  background: rgba(255, 255, 255, 0);
  color: #39b772;
  border: 2rpx solid #3bb872;
}
</style>
