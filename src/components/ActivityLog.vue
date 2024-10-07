<template>
    <div class="flow-root">
      <ul class="-mb-8">
        <li v-for="(activity, activityIdx) in activities" :key="activity.id">
          <div class="relative pb-8">
            <span v-if="activityIdx !== activities.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div class="relative flex space-x-3">
              <div>
                <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                  <!-- 可以根据不同的操作类型使用不同的图标 -->
                  <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                <div>
                  <p class="text-sm text-gray-500">{{ activity.action }} <a href="#" class="font-medium text-gray-900">{{ activity.filename }}</a></p>
                </div>
                <div class="text-right text-sm whitespace-nowrap text-gray-500">
                  <time :datetime="activity.timestamp">{{ formatDate(activity.timestamp) }}</time>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { formatDate } from '@/utils/helpers'
  
  export default {
    setup() {
      const activities = ref([])
  
      const fetchActivities = async () => {
        // 从API获取活动日志数据
        // 这里应该调用你的API服务
        // const response = await api.getActivityLog()
        // activities.value = response.data
      }
  
      onMounted(() => {
        fetchActivities()
      })
  
      return {
        activities,
        formatDate
      }
    }
  }
  </script>