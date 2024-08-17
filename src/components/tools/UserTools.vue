<template>
  <div class="user-tools">
    <div class="tools-wrap">
      <button class="tool-select-temp"><i class="icon-temp"></i></button>
      <button class="tools-stop"><i class="icon-stop"></i></button>
      <button class="tools-bottom"><i class="icon-buttom"></i></button>
    </div>
  </div>
</template>

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
      background-image: url('@/ssets/svg/tools/icon-stop.svg');
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
      background-image: url('@/ssets/svg/tools/icon-buttom.svg');
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
