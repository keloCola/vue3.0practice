<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import {reactive} from 'vue'

export default {
  props: ['message']
}
// 导出有关弹窗的方法
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  // 弹窗显示函数
  const showToast = (message) => {
    toastData.showToast = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 2000)
  }

  return {toastData, showToast}
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';

.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: $bgColor;
}
</style>
