<template>
  <div class="user-input">
    <textarea
      v-model="msg"
      @keydown.enter="btnSend"
      @focus="btnFocus"
      @blur="btnBlur"
      placeholder="Ask me anything...(Shift + Enter = line break)"
      spellcheck="false"
      :class="{ 'user-input-start': isFocus }"
    ></textarea>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { useRobotMsgStore } from '@/stores'

const store = useRobotMsgStore()

const msg = ref('')
//const chartMessage = reactive<string[]>([])

// const refChatMessage = ref()
const btnSend = async () => {
  store.robotMsgFnPush(msg.value)
  await nextTick()
  // refChatMessage.value.scrollTop = refChatMessage.value.scrollHeight
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
.user-input textarea {
  width: 100%;
  height: 35px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: height 0.3s;
  padding: 6px;
  border-radius: 6px;
  outline: none;
  resize: none;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
}
.user-input .user-input-start {
  height: 100px;
}
</style>
