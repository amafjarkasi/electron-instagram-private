<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElIcon, ElTable, ElTableColumn } from 'element-plus'

const router = useRouter()

const accountInfo = [
  { username: 'admin', email: 'joe@aol.com', role: 'admin', level: 'high' },
  { username: 'user', email: 'john@gmail.com', role: 'user', level: 'medium' },
  { username: 'guest', email: 'guest@email.com', role: 'guest', level: 'low' },
  { username: 'admin', email: 'joe@aol.com', role: 'admin', level: 'high' },
  { username: 'user', email: 'john@gmail.com', role: 'user', level: 'medium' },
  { username: 'guest', email: 'guest@email.com', role: 'guest', level: 'low' },
  { username: 'admin', email: 'joe@aol.com', role: 'admin', level: 'high' },
  { username: 'user', email: 'john@gmail.com', role: 'user', level: 'medium' },
  { username: 'guest', email: 'guest@email.com', role: 'guest', level: 'low' },
  { username: 'admin', email: 'joe@aol.com', role: 'admin', level: 'high' },
  { username: 'user', email: 'john@gmail.com', role: 'user', level: 'medium' },
  { username: 'guest', email: 'guest@email.com', role: 'guest', level: 'low' }
]
</script>

<template>
  <div class="dropdown-container">
    <el-dropdown>
      <el-button type="primary">
        Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @command="() => router.push('/usage')">Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="table-container">
    <el-table
      :data="accountInfo"
      selection-type="single"
      style="width: 100%"
      max-height="250"
      stripe
      highlight-current-row
    >
      <el-table-column type="selection" width="40" />
      <el-table-column prop="username" label="Username" width="150"></el-table-column>
      <el-table-column prop="email" label="Email" width="200"></el-table-column>
      <el-table-column prop="role" label="Role" width="120"></el-table-column>
      <el-table-column prop="level" label="Level" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.dropdown-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.table-container {
  margin-top: 40px;
  width: 100%;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
