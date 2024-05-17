<template>
  <h2 class="versions-title">Application Versions</h2>
  <el-timeline style="padding-right: 30px">
    <el-timeline-item>
      <el-card class="box-card">
        Electron: <span class="version-number">{{ versions.electron }}</span>
      </el-card>
    </el-timeline-item>
    <el-timeline-item>
      <el-card class="box-card">
        Node.js: <span class="version-number">{{ versions.node }}</span>
      </el-card>
    </el-timeline-item>
    <el-timeline-item>
      <el-card class="box-card">
        Chromium: <span class="version-number">{{ versions.chrome }}</span>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElTimeline, ElTimelineItem, ElCard } from 'element-plus'
const versions = reactive({ ...window.electron.process.versions })
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

.version-number {
  font-weight: bold;
  color: #fff;
}
</style>
