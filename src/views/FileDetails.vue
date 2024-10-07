<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div v-if="file" class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              文件详情
            </h3>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  文件名
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ file.filename }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  大小
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatFileSize(file.size) }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  上传时间
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatDate(file.upload_time) }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  下载次数
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ file.download_count }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="mt-6 flex flex-col sm:flex-row sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button @click="downloadFile" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            下载文件
          </button>
          <button @click="shareFile" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            分享文件
          </button>
          <button @click="deleteFile" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            删除文件
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { formatFileSize, formatDate } from '@/utils/helpers'
  import api from '@/services/api'
  
  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const file = ref(null)
  
      const fetchFileDetails = async () => {
        const fileId = route.params.id
        // 从API获取文件详情
        // const response = await api.getFileDetails(fileId)
        // file.value = response.data
      }
  
      const downloadFile = async () => {
        // 实现文件下载逻辑
      }
  
      const shareFile = () => {
        // 打开分享模态框
      }
  
      const deleteFile = async () => {
        // 实现文件删除逻辑
        // 删除成功后返回文件列表页面
        // await api.deleteFile(file.value.id)
        // router.push('/')
      }
  
      onMounted(() => {
        fetchFileDetails()
      })
  
      return {
        file,
        formatFileSize,
        formatDate,
        downloadFile,
        shareFile,
        deleteFile
      }
    }
  }
  </script>