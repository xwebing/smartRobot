<template>
  <div class="user-input">
    <textarea
      v-model="msg"
      @keydown.enter="btnSend"
      placeholder="Ask me anything...(Shift + Enter = line break)"
      spellcheck="false"
      class="user-input-textarea"
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

</script>
<style lang="less" scoped>
.user-input textarea {
  width: 100%;
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
  &:not(:focus) {
    height: 35px;
    transition: height .9s;
  }
  &:focus {
    height: 100px;
    transition: height 0.3s;
  }
}
</style>
