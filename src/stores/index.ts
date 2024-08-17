import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { ChatItem } from '@/components/chat/index'

export const useRobotMsgStore = defineStore('counter', () => {
  const robotMsgStore = reactive<ChatItem[]>([
    {
      role: 'robot',
      content: '你好，我是ChatGPT，很高兴认识你！有什么问题或需求尽管告诉我，我会尽力帮忙的。'
    }
  ])
  const robotMsgFnPush = (str: string) => {
    const ramdomRole = Math.floor(Math.random() * 10) > 5
    const nextVersion = {
      role: 'robot',
      content: [
        { type: 'text', text: str },
        { type: 'code', lang: 'typescript', data: [] },
        { type: 'table', field: [], data: [] },
        { type: 'echat', data: [] }
      ]
    }
    robotMsgStore.push({
      role: ramdomRole ? 'user' : 'robot',
      content: str
    })
  }
  const robotMsg = computed(() => robotMsgStore)

  return { robotMsg, robotMsgFnPush }
})

// step1: 移除动画
// step2: 清屏
// step3: 输入框
// step4: 发送按钮
// step5: 聊天框
// step6: 停止运行、重新运行
// step7: 点赞点踩更多反馈弹窗
// step8: 流式输出
// step9: 内容分类：text、table、code、chart
// step10: 代码高亮
