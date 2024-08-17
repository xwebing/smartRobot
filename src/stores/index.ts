import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { ChatItem } from '@/components/chat/index'

export const useRobotMsgStore = defineStore('counter', () => {
  const robotMsgStore = reactive<ChatItem[]>([])
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
