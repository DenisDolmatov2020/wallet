<template>
  <div>
    <form @submit.prevent="updateData">
      <input type="text" v-model="address" placeholder="Wallet Address" />
      <input type="number" v-model="currentBalance" placeholder="Current Balance" />
      <input type="number" v-model="targetBalance" placeholder="Target Balance" />
      <input type="text" v-model="goal" placeholder="Goal" />
      <label>
        <input type="checkbox" v-model="autoUpdate" /> Auto Update
      </label>
      <button type="submit">Update</button>
    </form>

    <div class="buttons">
      <button @click="router.push('/')" >
        To Index Page
      </button>
      <button @click="logout" >
        Logout
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const address = ref<string>('')
const currentBalance = ref<number>(0)
const targetBalance = ref<number>(0)
const goal = ref<string>('')
const autoUpdate = ref<boolean>(false)
const router = useRouter()

const fetchData = async () => {
  const response = await axios.get('/wallet')
  address.value = response.data.address
  currentBalance.value = response.data.currentBalance
  targetBalance.value = response.data.targetBalance
  goal.value = response.data.goal
  autoUpdate.value = response.data.autoUpdate
}

const updateData = async () => {
  await axios.put('/wallet', {
    address: address.value,
    currentBalance: currentBalance.value,
    targetBalance: targetBalance.value,
    goal: goal.value,
    autoUpdate: autoUpdate.value,
  })
}

const logout = () => {
  sessionStorage.clear()
  router.push('/login')
}

onMounted(() => {
  const loggedIn = sessionStorage.getItem('loggedIn')
  if (!loggedIn) {
    router.push('/login')
  } else {
    fetchData()
  }
})
</script>
<style scoped>
.buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  gap: 4px;
}
form {
  width: 375px;
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  gap: 10px;
}
</style>
