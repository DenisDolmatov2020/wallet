<template>
  <div>
    <h1>{{ goal }}</h1>
    <p>Current Balance: {{ currentBalance }}</p>
    <p>Target Balance: {{ targetBalance }}</p>
    <button @click="fetchData({ forceUpdate: true })">Update Balance</button>
  </div>

  <button class="button" @click="$router.push('/admin')">
    To Admin Page
  </button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const goal = ref<string>('')
const currentBalance = ref<number>(0)
const targetBalance = ref<number>(0)

const fetchData = async (params = {}) => {
  const response = await axios.get('/wallet', { params })
  goal.value = response.data.goal
  currentBalance.value = response.data.currentBalance
  targetBalance.value = response.data.targetBalance
}


onMounted(() => {
  fetchData()
})
</script>
<style scoped>
.button {
  position: absolute;
  top: 20px;
  right: 20px
}
div {
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  gap: 10px;
}
</style>
