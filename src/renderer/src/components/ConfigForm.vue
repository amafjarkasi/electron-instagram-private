<script setup>
import { reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElCard, ElNotification } from 'element-plus'
const form = reactive({
  name: '',
  email: '',
  password: ''
})
const onSubmit = () => {
  console.log(form)
}

const onReset = (msg) => {
  ElNotification({
    title: 'Error Message',
    message: msg,
    type: 'error'
  })
}
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
      <el-form-item>
        <el-button type="primary" native-type="submit">Submit</el-button>
        <el-button type="danger" @click="onReset('Issue reseting password')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
