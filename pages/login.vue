<template>
  <div>
    <form @submit.prevent="login">
      <h1>
        LOGIN
      </h1>
      <input type="text" v-model="username" placeholder="Username" autocomplete="username" />
      <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')


const login = () => {
  try {
    sessionStorage.setItem('loggedIn', 'true')
    router.push('/admin')
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  const loggedIn = sessionStorage.getItem('loggedIn')
  if (loggedIn) {
    router.push('/admin')
  }
})
</script>
<style scoped>
form {
  width: 375px;
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  gap: 10px;
}
</style>
