<template>
  <div class="robot">
    <div class="header">header</div>
    <div class="content" ref="refChatMessage">
      <div v-for="(item, index) in robotMsg" :key="index">
        <!-- 引导语 -->
        <!-- robot -->
        <!-- user -->
        <ChatItem v-bind="{ item }" />
      </div>
    </div>

    <div class="footer">
      <UserTools v-bind="{ refChatMessage }" />
      <UserInput v-bind="{ refChatMessage }" @scrollToButtom="scrollToButtom" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRobotMsgStore } from '@/stores'
import { ref } from 'vue'
import UserTools from './tools/UserTools.vue'
import UserInput from './input/UserInput.vue'
import ChatItem from './chat/ChatItem.vue'

const { robotMsg } = useRobotMsgStore()

const refChatMessage = ref()

// watch(
//   () => robotMsg.length,
//   async () => {
//     await nextTick()
//     refChatMessage.value.scrollTop = refChatMessage.value.scrollHeight
//   }
// )
function scrollToButtom() {
  refChatMessage.value.scrollTop = refChatMessage.value.scrollHeight
}
</script>

<style scoped>
.robot {
  position: relative;
  box-sizing: border-box;
  z-index: 1000;
  background-color: #fff;
  width: 400px;
  height: 100vh;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.72);
  display: flex;
  flex-direction: column;
  background: url('@/assets/robot-bg.png') no-repeat;
  background-position: center;
  background-size: cover;
  padding-bottom: 12px;

  /* background-image: linear-gradient(#ededed, #b5d1e3, #09f); */
  color: #40485b;
}
.header {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  color: #fff;
  position: absolute;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  z-index: 1000;
}
.content {
  /* min-height: calc(100% - 48px - 100px - 16px); */
  padding-top: 60px;
  height: calc(100% - 48px - 35px - 12px);
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  white-space: break-spaces;
  word-wrap: break-word; /* 使得长单词或数字可以换行 */
  overflow-wrap: break-word; /* 确保兼容性 */
  word-break: break-all;
  padding-right: 12px;
  padding-left: 12px;
  padding-bottom: 24px;
}
.footer {
  padding: 0 12px;
}
</style>
<style>
/* 自定义整个滚动条 */
::-webkit-scrollbar {
  width: 6px; /* 设置滚动条的宽度 */
}

/* 自定义滚动条轨道 */
::-webkit-scrollbar-track {
  border-radius: 6px;
  background-color: transparent;
}

/* 自定义滚动条的滑块（thumb） */
::-webkit-scrollbar-thumb {
  background: #888; /* 设置滑块的背景颜色 */
  border-radius: 6px;
}

/* 当滑块悬停或活动时，可以添加更多样式 */
::-webkit-scrollbar-thumb:hover {
  background: #555; /* 设置滑块在悬停状态下的背景颜色 */
}
</style>
