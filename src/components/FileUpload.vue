<template>
    <div class="max-w-xl">
      <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div class="space-y-1 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="flex text-sm text-gray-600">
            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>上传文件</span>
              <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple @change="handleFileUpload">
            </label>
            <p class="pl-1">或拖拽文件到这里</p>
          </div>
          <p class="text-xs text-gray-500">
            支持任意文件类型，最大100MB
          </p>
        </div>
      </div>
      <div v-if="isUploading" class="mt-4">
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                上传进度
              </span>
            </div>
            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-indigo-600">
                {{ uploadProgress }}%
              </span>
            </div>
          </div>
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div :style="{ width: `${uploadProgress}%` }" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // ... 组件逻辑
  }
  </script>