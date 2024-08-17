<template>
  <div class="chat" :class="{ user: item.role === 'user' }">
    <div class="avatar">
      <img v-if="item.role === 'user'" src="@/assets/img/robot-user.jpg" :alt="item.role" />
      <img v-else src="@/assets/img/robot.png" :alt="item.role" />
    </div>
    <div class="content">{{ item.content }}</div>
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
  margin-bottom: 12px;
  &.user {
    flex-direction: row-reverse;
    .content {
      background-color: #d2f9d1;
    }
    // .avatar {
    //   background: url('@/assets/img/robot-user.jpg') no-repeat;
    //   background-size: contain;
    // }
  }
  // .avatar {
  //   width: 40px;
  //   height: 40px;
  //   border-radius: 50%;
  //   background-color: #999;
  //   color: #fff;
  //   font-size: 12px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   background: url('@/assets/img/robot.png') no-repeat;
  //   background-size: contain;
  //   background-position: center;
  //   border: 1px solid #fff;
  //   background-color: #fff;
  //   border: 1px solid #fff;
  //   /* backdrop-filter: contrast(0) blur(1px); */
  // }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      background-color: #fff;
    }
  }
  .content {
    background-color: #fff;
    padding: 8px;
    width: fit-content;
    border-radius: 6px;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
