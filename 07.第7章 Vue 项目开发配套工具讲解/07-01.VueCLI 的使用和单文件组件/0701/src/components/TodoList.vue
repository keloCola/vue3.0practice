<template>
  <div>
    <input v-model="inputValue"/>
    <button @click="handleClick">提交</button>
    <div>
      <ul>
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue'

export default {
  name: 'TodoList',
  setup() {
    // 数组
    const list = reactive([])
    const inputValue = ref('')
    const handleClick = () => {
      list.push(inputValue.value)
      inputValue.value = ''
    }
    return {list, inputValue, handleClick}
  }
}
</script>

