import { defineStore } from 'pinia'

export const useLoggerStore = defineStore('logger', {
  state: () => ({
    logs: []
  }),
  actions: {
    addLog(log) {
      this.logs.push(log)
    },
    clearLogs() {
      this.logs = []
    }
  }
})