<script setup>
import { reactive, onMounted } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCard,
  ElNotification,
  ElCheckbox
} from 'element-plus'
import { useLoggerStore } from '../store/logger'

const loggerStore = useLoggerStore()
const form = reactive({
  name: '',
  email: '',
  password: ''
})
const onSubmit = () => {
  loggerStore.addLog('Submitting form')
  console.log(form)
}

const onReset = (msg) => {
  ElNotification({
    title: 'Error Message',
    message: msg,
    type: 'error'
  })
}

onMounted(() => {
  loggerStore.addLog('Submitting form')
})
</script>
<template>
  <el-card class="box-card" shadow="never">
    <el-form :model="form" label-width="auto" @submit.prevent="onSubmit">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="Checkbox">
        <el-checkbox v-model="form.checkbox">Check me</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Submit</el-button>
        <el-button type="danger" @click="onReset('Issue reseting password')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
