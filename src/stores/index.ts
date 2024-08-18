import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ChatItem } from '@/components/chat/index'

export const useRobotGlobalStore = defineStore('robotGlobal', () => {})

export const useRobotMsgStore = defineStore('robotMsg', () => {
  const HelloWord: ChatItem = {
    role: 'robot',
    messageId: 0,
    content: '你好，我是ChatGPT，很高兴认识你！有什么问题或需求尽管告诉我，我会尽力帮忙的。'
  }
  const robotMsgStore = reactive<ChatItem[]>([HelloWord])
  // push
  const robotMsgFnPush = (str: string | ChatItem) => {
    if (typeof str === 'string') {
      const ramdomRole = Math.floor(Math.random() * 10) > 5
      robotMsgStore.push({
        role: ramdomRole ? 'user' : 'robot',
        content: str
      })
    } else {
      robotMsgStore.push(str)
    }

    // const nextVersion = {
    //   role: 'robot',
    //   type: 'question' ?? 'answer',
    //   content: [
    //     { dataType: 'text', text: str },
    //     { dataType: 'code', lang: 'typescript', data: [] },
    //     { dataType: 'table', field: [], data: [] },
    //     { dataType: 'echat', data: [] }
    //   ]
    // }
  }
  // remove by index
  const robotMsgFnRemoveByIndex = (index: number = 0) => {
    robotMsgStore.splice(index, 1)
  }
  // romove all
  const clearMsg = () => {
    robotMsgStore.splice(0, robotMsgStore.length - 1)
  }
  const robotMsg = computed(() => {
    return robotMsgStore
  })

  return { HelloWord, robotMsg, robotMsgFnPush, robotMsgFnRemoveByIndex, clearMsg }
})

// step1: 动画、移除动画
// step2: 清屏
// step3: 输入框
// step4: 发送按钮
// step5: 聊天框
// step6: 停止运行、重新运行
// step7: 点赞点踩更多反馈弹窗
// step8: 流式输出
// step9: 内容分类：text、table、code、chart
// step10: 代码高亮
