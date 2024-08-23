<template>
  <div class="user-tools">
    <div class="tools-wrap">
      <button @click="btnClear" class="tool-select-temp"><i class="icon-temp"></i></button>
      <button class="tools-stop"><i class="icon-stop"></i></button>
      <button class="tools-bottom"><i class="icon-buttom"></i></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
import { useRobotMsgStore } from '@/stores'

const props = defineProps<{ refChatMessage: Element }>()

const store = useRobotMsgStore()

const getAllItemTotalHeight = () => {
  const itemTotal = document.querySelectorAll('.content .chat')
  let total = 0
  for (const item of itemTotal) {
    total += item.getBoundingClientRect().height + 12
  }
  return total
}

const getLastItemTop = () => {
  const itemTotal = document.querySelectorAll('.content .chat')
  const lastItem = itemTotal[itemTotal.length - 1]
  return lastItem.getBoundingClientRect().top
}

const btnClear = async () => {
  store.robotMsgFnPush(store.HelloWord)
  await nextTick()
  // const allItemHeight = getAllItemTotalHeight()
  // const scrollHeight = props.refChatMessage.scrollHeight
  const lastTop = getLastItemTop()
  props.refChatMessage.getAnimations().forEach((ani) => ani.cancel())
  const domAni = props.refChatMessage.animate(
    [
      {
        transform: 'translateY(0px)'
      },
      {
        transform: `translateY(-${lastTop - 48 - 12}px)`
      }
    ],
    {
      duration: 500
      // fill: 'forwards'
    }
  )
  domAni.finished.then(() => {
    nextTick(() => {
      store.clearMsg()
    })
  })
}
</script>

<style lang="less" scoped>
.user-tools {
  display: flex;
  position: relative;
  .tools-wrap {
    position: absolute;
    top: -30px;
    display: flex;
    width: 100%;
  }
  .tool-select-temp {
    background-color: #fff;
    border: 1px solid transparent;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    &:hover {
      .icon-temp {
        background-color: #1089ff;
      }
    }
    .icon-temp {
      display: inline-flex;
      width: 12px;
      height: 12px;
      background-color: #666;
      mask: url('@/assets/svg/tools/icon-temp.svg');
      mask-size: 100% 100%;
      background-position: center;
      background-size: cover;
      transition: all 0.3s;
    }
  }
  .tools-stop {
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid transparent;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      .icon-stop {
        background-color: #1089ff;
      }
    }
    .icon-stop {
      display: inline-flex;
      width: 12px;
      height: 12px;
      background-image: url('@/assets/svg/tools/icon-stop.svg');
      background-color: #666;
      mask: url('@/assets/svg/tools/icon-stop.svg');
      mask-size: 100% 100%;
      background-position: center;
      background-size: cover;
      transition: all 0.3s;
    }
  }
  .tools-bottom {
    background-color: #fff;
    border: 1px solid transparent;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    &:hover {
      .icon-buttom {
        background-color: #1089ff;
      }
    }
    .icon-buttom {
      display: inline-flex;
      width: 12px;
      height: 12px;
      background-image: url('@/assets/svg/tools/icon-buttom.svg');
      background-color: #666;
      mask: url('@/assets/svg/tools/icon-buttom.svg');
      mask-size: 100% 100%;
      background-position: center;
      background-size: cover;
      transform: rotate(180deg);
      transition: all 0.3s;
    }
  }
}
</style>
