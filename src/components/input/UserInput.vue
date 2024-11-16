<template>
  <div class="user-input">
    <!-- <textarea
      v-model="msg"
      @keydown.enter="btnSend"
      placeholder="Ask me anything...(Shift + Enter = line break)"
      spellcheck="false"
      class="user-input-textarea"
    ></textarea> -->

    <select v-model="userTempSelect" @change="userTempSelectChange">
      <option v-for="item in userTempSelectList" :key="item.id" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <!-- 可以让编辑区域只能键入纯文本
    <div contenteditable="plaintext-only"></div> -->
    <div
      class="input-div"
      ref="refInputDiv"
      @keypress="onKeypress"
      @keydown="onkeydown"
      @keyup="onkeyup"
      @input="onInput"
      @compositionend="onCompositionend"
      @paste="onPaste"
      :contenteditable="contenteditableIsTemp"
      placeholder="输入内容哈哈"
      :class="{ 'input-focus': inputDivLength > 0 }"
    >
      <!-- 遗留项：删除键back, 遇到contenteditable=“false” 或者里边有脏东西时，不成功， 1.判断删除的内容是不是contenteditable=“false”，手动删除，2. 查看脏数据 -->
    </div>
    <div class="input-tools">
      <div class="limit-count">
        <span :class="{ red: inputDivLength > maxlength }">{{ inputDivLength }}</span>
        <span>/{{ maxlength }}</span>
      </div>
      <span class="btn-send" :class="{ send: inputDivLength > 0 }">SEND</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
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
          transform: 'translateY(0px)',
        },
        {
          // 60 + 12
          transform: 'translateY(-72px)',
        },
      ],
      {
        duration: 300,
        // fill: 'forwards'
      },
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

const refInputDiv = ref()
const maxlength = ref(200)
const inputDivLength = ref(0)
const onKeypress = (event: any) => {
  // 粘贴事件不走这里
  console.log('onKeypress')

  if (event.target.innerText.length >= maxlength.value) {
    event.preventDefault()
  }
}
const onInput = (event: any) => {
  // inputDivLength.value = event.target.innerText.length
  // console.log(event)
  // var maxLength = 100 // 最大字数
  // var currentLength = event.target.innerText.length // 当前字数
  // var exceeded = currentLength - maxlength.value // 超出字数
  // if (currentLength > maxlength.value) {
  //   // 截取字符串至最大长度
  //   event.target.innerText = event.target.innerText.substring(0, maxLength)
  //   console.log('字数已超过限制，当前字数：' + maxLength + '，已截取字符。')
  // }
  // var currentLength = event.textContent.length // 当前字数
  // var exceeded = currentLength - maxlength.value // 超出字数
  // if (currentLength > maxlength.value) {
  //   // 截取字符串至最大长度
  //   event.target.innerText = event.textContent.substring(0, maxlength.value)
  //   console.log('==', event.target.innerText.length)
  //   // console.log('字数已超过限制，当前字数：' + maxLength + '，已截取字符。')
  // }
}
const onCompositionend = (event: any) => {
  // 中文输入法拼音
  console.log('onCompositionend', event.target.innerText)

  const diff = event.target.innerText.length - maxlength.value
  if (diff > 0) {
    const range = document.createRange()
    const sel = window.getSelection() as Selection
    const offset = sel.anchorOffset
    const node = sel.anchorNode as HTMLElement
    const text = node.textContent as string
    range.selectNodeContents(node)
    sel.removeAllRanges()
    setTimeout(() => {
      sel.addRange(range)
      sel.extend(node, offset)
      document.execCommand('delete', false)
      document.execCommand('insertText', false, text.substring(0, offset - diff))
    })
  }
}

const onkeydown = (event: any) => {
  console.log('onkeydown', event.target.innerText.length)
  // Ctrl+Enter换行
  // inputDivLength.value = event.target.innerText.length
  if (event.keyCode == 13 && event.ctrlKey) {
    console.log(event.target.innerText.length)

    // if (event.target.innerText < maxlength.value) {
    //   return
    // }

    refInputDiv.value.innerHTML += /<br>$/.test(refInputDiv.value.innerHTML) ? '<br>' : '<br><br>'
    placeCaretAtEnd(refInputDiv.value)
    refInputDiv.value.scrollTop = refInputDiv.value.scrollHeight
    event.preventDefault()
    return false
  } else if (event.keyCode == 13) {
    // Enter发送
    console.log('Enter发送', event.target.innerText)
    sendToMsg()
    event.preventDefault()
  }
  var isContentEditableFalse = event.target.contentEditable === 'false'
  console.log(isContentEditableFalse)

  if (event.key === 'Backspace' && isContentEditableFalse) {
    console.log(111)

    event.preventDefault()
    // 在这里添加你的处理逻辑，比如删除前一个元素或者其他操作
  }
  // if (event.target.innerText.length > 50) {
  //   event.preventDefault();
  //   return;
  // }
  // if(event.keyCode == 13){
  //   return
  // }
}
const onkeyup = (event: any) => {
  console.log(
    'onkeyup',
    event.target.innerHTML,
    event.target.innerText,
    event.target.innerText.length,
    '==',
  )
  const textHtml = refInputDiv.value.innerHTML
  const text = refInputDiv.value.innerText
  inputDivLength.value = /<br>$/.test(textHtml) ? text.trim().length + 1 : text.length
}
const onPaste = (event: any) => {
  event.preventDefault()
  if (event.target.innerText.length > maxlength.value) {
    // inputDivLength.value = event.target.innerText.length
    return
  }
  // @ts-ignore
  let paste = (event.clipboardData || window.clipboardData).getData('text')
  if (paste.length > maxlength.value) {
    paste = paste.substring(0, maxlength.value - event.target.innerText.length)
  }
  const selection = window.getSelection() as Selection
  if (!selection.rangeCount) {
    return
  }
  selection.deleteFromDocument()
  selection.getRangeAt(0).insertNode(document.createTextNode(paste))
  selection.collapseToEnd()

  // var pastedText = undefined
  // if (window.clipboardData && window.clipboardData.getData) {
  //   // IE
  //   pastedText = window.clipboardData.getData('Text')
  // } else if (e.clipboardData && e.clipboardData.getData) {
  //   pastedText = e.clipboardData.getData('text/plain')
  // }
  // // 放到光标位置
  // const rangeInfo = this.getEditorRange()
  // if (rangeInfo && pastedText) {
  //   rangeInfo.range.deleteContents()
  //   const newTextNode = document.createTextNode(pastedText)
  //   this.insertHtmlAtCaret(newTextNode, rangeInfo.selection, rangeInfo.range)
  // }
  // e.preventDefault()
  // return false;
}
const placeCaretAtEnd = (el: any) => {
  el.focus()
  if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const sel = window.getSelection() as Selection
    sel.removeAllRanges()
    sel.addRange(range)
    // @ts-ignore
  } else if (typeof document.body.createTextRange !== 'undefined') {
    // @ts-ignore
    const textRange = document.body.createTextRange()
    textRange.moveToElementText(el)
    textRange.collapse(false)
    textRange.select()
  }
}
const sendToMsg = async () => {
  // 发送信息检测以及格式化\n
  const inputText = refInputDiv.value.innerText
  if (inputText.length > maxlength.value) {
    alert('字符超出限制')
    return
  }
  const textArr = inputText.split('\n').filter((item: any) => item)
  if (textArr.length > 5) {
    alert('最多只能发送5条消息')
    return
  }
  const msg = textArr.join('\n')
  initScrollAnimation()
  store.robotMsgFnPush(msg)
  await nextTick()
  emit('scrollToButtom')
}

const contenteditableIsTemp = ref(true)
const userTempSelect = ref()
const userTempSelectList = reactive([
  {
    id: 1,
    // value:
    //   '<span contenteditable="false">我需要会计期为【<span placeholder="1" contenteditable="true"></span>】的报表，指标为【<span placeholder="1" contenteditable="true"></span>】请帮我生成</span>&#8203;',
    // value:
    //   '<span contenteditable="false">我需要会计期为【<span placeholder="1" contenteditable="true"></span>】的报表，指标为【<span placeholder="1" contenteditable="true"></span>】请帮我生成</span>&nbsp;',
    value:
      '<span contenteditable="false">我需要会计期为【<span placeholder="1" contenteditable="true"></span>】的报表，指标为【<span placeholder="1" contenteditable="true"></span>】请帮我生成</span>&#8203;',
    label: '模板1',
  },
  // {
  //   id: 2,
  //   value:
  //     '<span contenteditable="false">我需要日期为【<span placeholder="20000101、20000102" contenteditable="true"></span>】的报表，指标为【<span placeholder="A1、A2" contenteditable="true"></span>】，岗位是月上【<span placeholder="程序员、算法" contenteditable="true"></span>】，请帮我生成</span>',
  //   label: '模板2',
  // },
  {
    id: 2,
    // value:
    //   '<span contenteditable="false">我需要日期为【<span placeholder="1" contenteditable="true"></span>】的报表，指标为【<span placeholder="A1" contenteditable="true"></span>】请帮我生成</span>&#8203;',
    value:
      '<span contenteditable="false">我需要日期为【<span placeholder="1" contenteditable="true"></span>】的报表，指标为【<span placeholder="A1" contenteditable="true"></span>】请帮我生成</span>&#8203;',
    label: '模板2',
  },
])
const userTempSelectChange = () => {
  console.log(userTempSelect.value)
  // contenteditableIsTemp.value = false
  const $input = refInputDiv.value
  refInputDiv.value.innerHTML =
    $input.innerText.length > 0
      ? `${refInputDiv.value.innerHTML}<br>${userTempSelect.value}`
      : `${userTempSelect.value}`
  inputDivLength.value = refInputDiv.value.innerText.length
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
      transition: height 0.9s;
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
// .user-input:has(textarea:focus) .robot-send {
//   background-color: rebeccapurple;
//   bottom: 0;
//   top: unset;
//   transform: translateY(-50%);
// }
// .user-input:has(textarea:not(:focus)) .robot-send {
//   // background-color: rebeccapurple;
//   // bottom: unset;
//   // top: 50%;
//   // transform: translateY(-50%);
// }

// input div
.input-div {
  background-color: #fff;
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
  // 只能纯文本输入
  -webkit-user-modify: read-write-plaintext-only;
  word-break: break-all; // 有的浏览器不会换行，允许换行
  &:not(:focus) {
    height: 35px;
    transition: height 0.3s;
  }
  &:focus,
  &.input-focus {
    height: 100px;
    transition: height 0.3s;
  }
  &:empty::before {
    content: attr(placeholder);
    font-size: 14px;
    color: gray;
  }
  ::v-deep span {
    outline: none;
    &:empty::before {
      content: attr(placeholder);
      color: gray;
    }
    // &:focus::after {
    //   content: none;
    // }
  }
}
.input-tools {
  position: absolute;
  bottom: 6px;
  right: 6px;
  display: flex;
  align-items: center;
  font-size: 12px;
  .btn-send {
    padding-left: 6px;
  }
  .send {
    cursor: pointer;
    color: #42b983;
  }
  span {
    font-style: normal;
    &.red {
      color: #f56c6c;
    }
  }
}
</style>
