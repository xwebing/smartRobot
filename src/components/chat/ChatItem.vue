<template>
  <div class="chat" :class="{ user: item.role === 'user' }">
    <div class="avatar">{{ item.role }}</div>
    <div class="content">{{ item.content }}..</div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: () => ({
      role: 'robot',
      content: 'hello'
    })
  }
})
</script>
<style lang="less" scoped>
.chat {
  display: flex;
  gap: 8px;
  &.user {
    flex-direction: row-reverse;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #999;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    background-color: #fff;
    padding: 12px;
    margin-bottom: 12px;
    width: fit-content;
    border-radius: 6px;
    font-size: 12px;
  }
}
</style>
