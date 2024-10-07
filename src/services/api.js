import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getFiles() {
    return api.get('/files')
  },
  getFileDetails(fileId) {
    return api.get(`/files/${fileId}`)
  },
  uploadFile(formData) {
    return api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteFile(fileId) {
    return api.delete(`/files/${fileId}`)
  },
  searchFiles(query) {
    return api.get('/files/search', { params: { q: query } })
  },
  getActivityLog() {
    return api.get('/activity-log')
  },
  generateShareLink(fileId, password) {
    return api.post(`/files/${fileId}/share`, { password })
  }
}