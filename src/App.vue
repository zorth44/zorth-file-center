<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <header class="bg-blue-600 text-white p-4 rounded-lg shadow-lg mb-6">
      <h1 class="text-3xl font-bold">内部文件共享系统</h1>
    </header>

    <main class="container mx-auto">
      <!-- 文件上传区域 -->
      <section class="mb-8">
        <div @drop.prevent="handleFileDrop" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false"
          :class="[
            'border-dashed border-2 rounded-lg p-8 text-center transition-all duration-300',
            dragover ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
          ]">
          <input type="file" ref="fileInput" @change="handleFileSelect" multiple class="hidden" />
          <p class="text-xl mb-4">拖拽文件到这里或者</p>
          <button @click="$refs.fileInput.click()"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            选择文件
          </button>
        </div>
        <div v-if="selectedFiles.length" class="mt-4">
          <p class="text-lg font-semibold">已选择 {{ selectedFiles.length }} 个文件</p>
          <ul class="mt-2">
            <li v-for="(file, index) in selectedFiles" :key="index"
              class="flex items-center justify-between bg-white p-2 rounded mb-2">
              <span>{{ file.name }}</span>
              <button @click="removeFile(index)" class="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </li>
          </ul>
          <button @click="uploadFiles"
            class="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            上传文件
          </button>
        </div>
      </section>

      <!-- 搜索区域 -->
      <section class="mb-8">
        <div class="flex">
          <input v-model="searchQuery" @input="searchFiles" type="text" placeholder="搜索文件..."
            class="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button @click="searchFiles"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg transition duration-300">
            搜索
          </button>
        </div>
      </section>

      <!-- 文件列表 -->
      <section class="bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 class="text-xl font-semibold p-4 bg-gray-50 border-b">文件列表</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文件名</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上传时间</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="file in files" :key="file.ID" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">{{ file.Filename }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatFileSize(file.Size) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(file.CreatedAt) }}</td>
                <td class="px-6 py-4 whitespace-nowrap space-x-2">
                  <button @click="downloadFile(file.ID)"
                    class="text-blue-600 hover:text-blue-900 transition duration-300">下载</button>
                  <button @click="deleteFile(file.ID)"
                    class="text-red-600 hover:text-red-900 transition duration-300">删除</button>
                  <button @click="showRenameModal(file)"
                    class="text-green-600 hover:text-green-900 transition duration-300">重命名</button>
                  <button @click="shareFile(file.ID)"
                    class="text-purple-600 hover:text-purple-900 transition duration-300">分享</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <!-- 重命名模态框 -->
    <div v-if="showRename" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h3 class="text-lg font-semibold mb-4">重命名文件</h3>
        <input v-model="newFilename" type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
        <div class="flex justify-end space-x-2">
          <button @click="cancelRename"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300">取消</button>
          <button @click="renameFile"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8492/api';

const files = ref([]);
const selectedFiles = ref([]);
const searchQuery = ref('');
const dragover = ref(false);
const showRename = ref(false);
const newFilename = ref('');
const fileToRename = ref(null);

onMounted(async () => {
  await fetchFiles();
});

const fetchFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files`);
    console.log('Fetched files:', response.data);
    files.value = response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
  }
};


const handleFileDrop = (event) => {
  dragover.value = false;
  const droppedFiles = Array.from(event.dataTransfer.files);
  selectedFiles.value = [...selectedFiles.value, ...droppedFiles];
};

const handleFileSelect = (event) => {
  const newFiles = Array.from(event.target.files);
  selectedFiles.value = [...selectedFiles.value, ...newFiles];
};

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1);
};

const uploadFiles = async () => {
  const formData = new FormData();
  selectedFiles.value.forEach((file) => {
    formData.append('file', file);
  });

  try {
    await axios.post(`${API_BASE_URL}/files/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    selectedFiles.value = [];
    await fetchFiles();
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};

const searchFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/search`, {
      params: { q: searchQuery.value }
    });
    files.value = response.data;
  } catch (error) {
    console.error('Error searching files:', error);
  }
};

const downloadFile = async (fileId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/${fileId}/download`, {
      responseType: 'blob'
    });
    
    // 从响应头中获取文件名
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'file'; // 默认文件名
    if (contentDisposition) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // 使用从服务器获取的文件名
    document.body.appendChild(link);
    link.click();
    link.remove(); // 清理 DOM
    window.URL.revokeObjectURL(url); // 释放 URL 对象
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

const deleteFile = async (fileId) => {
  if (confirm('Are you sure you want to delete this file?')) {
    try {
      await axios.delete(`${API_BASE_URL}/files/${fileId}`);
      await fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
};

const showRenameModal = (file) => {
  fileToRename.value = file;
  newFilename.value = file.Filename;
  showRename.value = true;
};

const renameFile = async () => {
  try {
    await axios.put(`${API_BASE_URL}/files/${fileToRename.value.ID}/rename`, {
      new_filename: newFilename.value
    });
    await fetchFiles();
    showRename.value = false;
  } catch (error) {
    console.error('Error renaming file:', error);
  }
};

const cancelRename = () => {
  showRename.value = false;
  newFilename.value = '';
  fileToRename.value = null;
};

const shareFile = async (fileId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/files/${fileId}/share`);
    alert(`分享链接: ${response.data.share_url}`);
  } catch (error) {
    console.error('Error sharing file:', error);
  }
};

const formatFileSize = (size) => {
  if (size === undefined || size === null) {
    return 'Unknown size';
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(2)} ${units[i]}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // 或者使用更复杂的日期格式化逻辑
};
</script>