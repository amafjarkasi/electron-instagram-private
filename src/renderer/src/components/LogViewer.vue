<template>
  <h2 class="versions-title">Latest Logs</h2>
  <el-input
    v-model="logs"
    type="textarea"
    :rows="10"
    placeholder="Logs will be displayed here"
    resize="none"
  ></el-input>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLoggerStore } from '../store/logger.js'
const loggerStore = useLoggerStore()
const logs = computed(() => loggerStore.logs.join('\n'))
</script>

<style scoped>
.box-card {
  margin-bottom: 10px;
}

.versions-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}

.el-input__inner {
  margin-top: 20px;
}
</style>
