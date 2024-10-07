import { createStore } from 'vuex'
import api from '@/services/api'

export default createStore({
  state: {
    files: [],
    currentFile: null,
    searchResults: [],
    activityLog: []
  },
  mutations: {
    SET_FILES(state, files) {
      state.files = files
    },
    SET_CURRENT_FILE(state, file) {
      state.currentFile = file
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results
    },
    SET_ACTIVITY_LOG(state, log) {
      state.activityLog = log
    }
  },
  actions: {
    async fetchFiles({ commit }) {
      const response = await api.getFiles()
      commit('SET_FILES', response.data)
    },
    async fetchFileDetails({ commit }, fileId) {
      const response = await api.getFileDetails(fileId)
      commit('SET_CURRENT_FILE', response.data)
    },
    async searchFiles({ commit }, query) {
      const response = await api.searchFiles(query)
      commit('SET_SEARCH_RESULTS', response.data)
    },
    async fetchActivityLog({ commit }) {
      const response = await api.getActivityLog()
      commit('SET_ACTIVITY_LOG', response.data)
    }
  },
  modules: {
    // 如果需要，可以在这里添加模块
  }
})