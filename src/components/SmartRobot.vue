<template>
  <div class="robot">
    <div class="header">header</div>
    <div class="content" ref="refChatMessage">
      <div v-for="(item, index) in chartMessage" :key="index">
        <div class="chat">{{ item }}</div>
      </div>
    </div>
    <div class="user-fns">
      <button>选择模板</button>
      <button>停止运行</button>
      <button>回到底部</button>
    </div>
    <div class="footer">
      <textarea
        v-model="msg"
        @keydown.enter="btnSend"
        @focus="btnFocus"
        @blur="btnBlur"
        :class="{ 'user-input-start': isFocus }"
      ></textarea>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
const msg = ref('')
const chartMessage = reactive<string[]>([])

const refChatMessage = ref()
const btnSend = async () => {
  chartMessage.push(msg.value)
  await nextTick()
  console.log(refChatMessage)
  refChatMessage.value.scrollTop = refChatMessage.value.scrollHeight
}

const isFocus = ref(false)
const btnFocus = () => {
  isFocus.value = true
}
const btnBlur = () => {
  isFocus.value = false
}
</script>

<style scoped>
.smart-robot {
  position: relative;
  display: flex;
  margin-left: auto;
}
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
  background: url('@/assets/robot-bg.jpg') no-repeat;
  background-position: center;
  background-size: cover;
  padding: 0 16px 16px 16px;

  background-image: linear-gradient(#ededed, #b5d1e3, #09f);
  color: #191919;
}
.header {
  display: flex;
  align-items: center;
  height: 48px;
  background-image: linear-gradient(#ededed);
}
.content {
  /* min-height: calc(100% - 48px - 100px - 16px); */
  height: calc(100% - 48px - 48px - 16px - 22px);
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 16px;
  scroll-behavior: smooth;
  white-space: break-spaces;
  word-wrap: break-word; /* 使得长单词或数字可以换行 */
  overflow-wrap: break-word; /* 确保兼容性 */
  word-break: break-all;
}
.content .chat {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
  width: fit-content;
  border-radius: 6px;
}
.footer textarea {
  width: 100%;
  height: 48px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: height 0.3s;
}
.footer .user-input-start {
  height: 100px;
}

/* 自定义整个滚动条 */
::-webkit-scrollbar {
  width: 6px; /* 设置滚动条的宽度 */
}

/* 自定义滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* 设置轨道的背景颜色 */
  border-radius: 6px;
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
