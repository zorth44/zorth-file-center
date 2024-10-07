<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900 my-8">文件共享系统</h1>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <FileList />
        </div>
        <div>
          <FileUpload />
          <div class="mt-6">
            <FileSearch />
          </div>
          <div class="mt-6">
            <h2 class="text-lg font-medium text-gray-900">最近活动</h2>
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FileList from '@/components/FileList.vue'
  import FileUpload from '@/components/FileUpload.vue'
  import FileSearch from '@/components/FileSearch.vue'
  import ActivityLog from '@/components/ActivityLog.vue'
  
  export default {
    components: {
      FileList,
      FileUpload,
      FileSearch,
      ActivityLog
    }
  }
  </script>