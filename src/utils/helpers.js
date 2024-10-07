export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }