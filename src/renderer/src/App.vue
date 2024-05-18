<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Versions from './components/Versions.vue'
import ConfigForm from './components/ConfigForm.vue'
import Statistics from './components/Statistics.vue'
import LoginForm from './components/LoginForm.vue'
import Usage from './components/Usage.vue'
import LogViewer from './components/LogViewer.vue'
import { ElTabs, ElTabPane, ElIcon } from 'element-plus'
import { HomeFilled, Setting, Star, User, InfoFilled, ChatDotRound } from '@element-plus/icons-vue'
import { useUserStore } from './store/user.js'
import { useLoggerStore } from './store/logger.js'

const username = ref('')
const password = ref('')
const userStore = useUserStore()
const loggerStore = useLoggerStore()

onMounted(async () => {
  loggerStore.addLog('App mounted')
  // const storedUsername = await window.electron.ipcRenderer.invoke('get-username')
  // const storedPassword = await window.electron.ipcRenderer.invoke('get-password')

  // if (storedUsername) {
  //   username.value = storedUsername
  // }

  // if (storedPassword) {
  //   password.value = storedPassword
  // }
})

const startLogin = async () => {
  // status.value = 'Logging in...'
  const loginStatus = await window.electron.ipcRenderer.invoke('login', {
    username: username.value,
    password: password.value
  })
  if (loginStatus) {
    // status.value = 'Logged in...'
  } else {
    // status.value = 'Failed to login...'
  }
}

const getAccount = async () => {
  const account = await window.electron.ipcRenderer.invoke('get-account-info')
  if (account.user) {
    // status.value = `Logged in as ${account.user.username}`
  } else {
    // status.value = 'Not logged in'
  }
}
</script>

<template>
  <el-tabs type="border-card" class="demo-tabs" height="100%">
    <el-tab-pane :disabled="!userStore.isLoggedIn">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>Main</span>
        </span>
      </template>
      <LoginForm />
    </el-tab-pane>
    <el-tab-pane :disabled="!userStore.isLoggedIn">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <Setting />
          </el-icon>
          <span>Config</span>
        </span>
      </template>
      <ConfigForm />
    </el-tab-pane>
    <el-tab-pane :disabled="!userStore.isLoggedIn">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <Star />
          </el-icon>
          <span>Role</span>
        </span>
      </template>
      <Statistics />
    </el-tab-pane>
    <el-tab-pane :disabled="!userStore.isLoggedIn">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <User />
          </el-icon>
          <span>Task</span>
        </span>
      </template>
      <Usage />
    </el-tab-pane>
    <el-tab-pane :disabled="!userStore.isLoggedIn">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <ChatDotRound />
          </el-icon>
          <span>Log</span>
        </span>
      </template>
      <LogViewer />
    </el-tab-pane>
    <el-tab-pane :disabled="!userStore.isLoggedIn">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <InfoFilled />
          </el-icon>
          <span>About</span>
        </span>
      </template>
      <Versions />
    </el-tab-pane>
  </el-tabs>
</template>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
