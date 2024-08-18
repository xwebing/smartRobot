export interface ChatItem {
  role: 'user' | 'robot'
  type?: string
  messageId?: number
  content: string
}
