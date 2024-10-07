<template>
    <div class="max-w-xl mx-auto">
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="search"
          id="search"
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="搜索文件..."
          v-model="searchQuery"
          @input="debounceSearch"
        >
        <div class="absolute inset-y-0 right-0 flex items-center">
          <button @click="search" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            搜索
          </button>
        </div>
      </div>
      <div v-if="searchResults.length > 0" class="mt-4">
        <h3 class="text-lg leading-6 font-medium text-gray-900">搜索结果</h3>
        <ul class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          <li v-for="file in searchResults" :key="file.id" class="py-4 flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-sm font-medium text-gray-900">{{ file.filename }}</span>
            </div>
            <div>
              <button @click="downloadFile(file)" class="text-indigo-600 hover:text-indigo-900">下载</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import debounce from 'lodash/debounce'
  
  export default {
    setup() {
      const searchQuery = ref('')
      const searchResults = ref([])
  
      const search = async () => {
        // 实现搜索逻辑
      }
  
      const debounceSearch = debounce(() => {
        search()
      }, 300)
  
      return {
        searchQuery,
        searchResults,
        search,
        debounceSearch
      }
    }
  }
  </script>