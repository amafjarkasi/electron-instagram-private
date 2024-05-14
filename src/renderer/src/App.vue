<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Versions from './components/Versions.vue'

const username = ref('')
const password = ref('')
const status = ref('Not logged in')

onMounted(async () => {
  const storedUsername = await window.electron.ipcRenderer.invoke('get-username')
  const storedPassword = await window.electron.ipcRenderer.invoke('get-password')

  if (storedUsername) {
    username.value = storedUsername
  }

  if (storedPassword) {
    password.value = storedPassword
  }
})

// const ipcHandle = () => {
//   window.electron.ipcRenderer.send('ping')
//   window.electron.ipcRenderer.on('pong', () => {
//     console.log('pong')
//     document.getElementsByClassName('text')[0].innerText = 'Pong'
//   })
// }

const startLogin = async () => {
  status.value = 'Logging in...'
  const loginStatus = await window.electron.ipcRenderer.invoke('login', {
    username: username.value,
    password: password.value
  })
  if (loginStatus) {
    status.value = 'Logged in...'
  } else {
    status.value = 'Failed to login...'
  }
}

const getAccount = async () => {
  const account = await window.electron.ipcRenderer.invoke('get-account-info')
  if (account.user) {
    status.value = `Logged in as ${account.user.username}`
  } else {
    status.value = 'Not logged in'
  }
}
</script>

<template>
  <div class="app-bar">
    <h1 class="app-name">Electron Instagram</h1>
  </div>
  <p class="tip">Enter credentials below</p>
  <div class="actions">
    <div class="action">
      <input v-model="username" class="input-field" type="text" placeholder="Username" />
      <input v-model="password" class="input-field" type="password" placeholder="Password" />
    </div>
  </div>
  <div id="button-section">
    <a class="login-button" target="_blank" rel="noreferrer" @click="startLogin">Login</a>
    <a class="login-button" target="_blank" rel="noreferrer" @click="getAccount">Account</a>
  </div>
  <div class="new-section">
    <p>Status: {{ status }}</p>
  </div>
  <Versions />
</template>
