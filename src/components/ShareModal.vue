<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                分享文件
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  生成的链接可以分享给其他人下载此文件。
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="share-link"
                id="share-link"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                :value="shareLink"
                readonly
              >
              <div class="absolute inset-y-0 right-0 flex items-center">
                <button @click="copyLink" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  复制
                </button>
              </div>
            </div>
            <div class="mt-4">
              <label for="password" class="block text-sm font-medium text-gray-700">
                设置密码（可选）
              </label>
              <div class="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  v-model="password"
                >
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" @click="generateShareLink">
                生成分享链接
              </button>
            </div>
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