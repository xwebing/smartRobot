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
import { ref, nextTick } from 'vue'
import { useRobotMsgStore } from '@/stores'

const props = defineProps<{ refChatMessage: Element }>()
const emit = defineEmits(['scrollToButtom'])

const store = useRobotMsgStore()

const msg = ref('')
//const chartMessage = reactive<string[]>([])

const initScrollAnimation = () => {
  if (store.robotMsg.some((item) => item.role === 'robot' && item.messageId === 0)) {
    props.refChatMessage.getAnimations().forEach((ani) => ani.cancel())
    const domAni = props.refChatMessage.animate(
      [
        {
          transform: 'translateY(0px)'
        },
        {
          // 60 + 12
          transform: 'translateY(-72px)'
        }
      ],
      {
        duration: 300
        // fill: 'forwards'
      }
    )
    domAni.finished.then(() => {
      store.robotMsgFnRemoveByIndex()
    })
  }
}

// const refChatMessage = ref()
const btnSend = async () => {
  initScrollAnimation()
  store.robotMsgFnPush(msg.value)
  await nextTick()
  emit('scrollToButtom')
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
