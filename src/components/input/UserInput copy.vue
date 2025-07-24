<template>
  <div class="user-input">
    <textarea
      v-model="msg"
      @keydown.enter="btnSend"
      placeholder="Ask me anything...(Shift + Enter = line break)"
      spellcheck="false"
      class="user-input-textarea"
    ></textarea>
    <div class="robot-send">icon</div>
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
.user-input {
  position: relative;
  display: flex;
  transition: all 0.3s;
  textarea {
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
  .robot-send {
    position: absolute;
    transition: all 0.3s;
    right: 12px;
   // top: 50%;
    bottom: 0;
    transform: translateY(-50%);
    background-color: rebeccapurple;
  }
}
.user-input:has(textarea:focus) .robot-send {
  background-color: rebeccapurple;
  bottom: 0;
  top: unset;
  transform: translateY(-50%);
}
.user-input:has(textarea:not(:focus)) .robot-send {
  // background-color: rebeccapurple;
  // bottom: unset;
  // top: 50%;
  // transform: translateY(-50%);
}

</style>
