<script setup>
import { reactive, ref, computed } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElCard, ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { useUserStore } from '../store/user'
import { useLoggerStore } from '../store/logger'

let formRef = ref(null)

const userStore = useUserStore()
const loggerStore = useLoggerStore()

const form = reactive({
  username: '',
  password: '',
  isLoading: false,
  successful: false
})

const rules = ref({
  username: [{ required: true, message: 'Please input your username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input your password', trigger: 'blur' }]
})

const isLoggedIn = computed(() => userStore.isLoggedIn)

const errorMessage = (msg) => {
  loggerStore.addLog('Error: ' + msg)
  ElMessage({
    message: msg,
    type: 'error',
    plain: true,
    duration: 2000
  })
}

const successMessage = (msg) => {
  ElMessage({
    message: msg,
    type: 'success',
    plain: true,
    duration: 2000
  })
}

const onSubmit = async () => {
  loggerStore.addLog('Submitting form')
  formRef.value.validate((valid) => {
    if (valid) {
      form.isLoading = true
      if (form.username === 'admin' && form.password === 'admin') {
        form.isLoading = false
        userStore.login(form.username)
        loggerStore.addLog('Logged in')
      } else {
        form.isLoading = false
        userStore.disconnect()
        loggerStore.addLog('Failed to login')
        errorMessage('Invalid username or password')
      }
    } else {
      console.log('Error submitting form')
      return false
    }
  })
}
</script>

<template>
  <div class="parent-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Login</span>
        </div>
      </template>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        @submit.prevent="onSubmit"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item style="margin-bottom: auto">
          <el-button
            class="submit-button"
            type="primary"
            native-type="submit"
            :loading="form.isLoading"
            :loading-icon="Loading"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <div class="status-bar">
      <span class="status-text">{{ isLoggedIn ? 'Logged in' : 'Not logged in' }}</span>
    </div>
  </div>
</template>

<style scoped>
.status-text {
  color: white;
  font-size: 16px;
  vertical-align: middle;
  font-weight: normal;
}

.status-bar {
  position: fixed;
  height: 16px;
  bottom: 0;
  width: 100%;
  padding-bottom: 25px;
  background-color: #409eff;
  text-align: center;
}

.card-header {
  font-size: 24px;
  text-align: center;
}

.parent-container {
  padding-top: 20px;
  width: 100%;
}

.box-card {
  width: 70%;
  margin: auto;
}

.submit-button {
  margin-top: 20px;
}
</style>
