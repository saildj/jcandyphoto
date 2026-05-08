<template>
  <div class="photos-page">
    <div class="content-section">
      <div class="section-header">
        <h1 class="section-title">所有照片</h1>
        <el-input
          v-model="searchQuery"
          placeholder="搜索照片..."
          :prefix-icon="Search"
          clearable
          class="search-input"
          @keyup.enter="handleSearch"
        />
      </div>

      <div v-if="loading" class="photo-grid">
        <el-skeleton v-for="i in 12" :key="i" animated class="photo-skeleton" />
      </div>

      <div v-else-if="photos.length > 0" class="photo-grid">
        <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo" />
      </div>

      <div v-else class="empty-state">
        <el-icon class="empty-icon"><Picture /></el-icon>
        <p class="empty-text">暂无照片</p>
      </div>

      <!-- 加载更多按钮 -->
      <div v-if="hasMore" class="load-more-wrapper">
        <el-button
          v-if="!loading"
          type="primary"
          size="large"
          @click="handlePageChange(current + 1)"
          class="load-more-btn"
        >
          加载更多
        </el-button>
        <el-button
          v-else
          type="primary"
          size="large"
          loading
          disabled
          class="load-more-btn"
        >
          加载中...
        </el-button>
      </div>

      <!-- 没有更多内容提示 -->
      <div v-if="photos.length > 0 && !hasMore" class="no-more-wrapper">
        <span class="no-more-text">— 没有更多内容了 —</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, Picture } from '@element-plus/icons-vue';
import PhotoCard from '@/components/common/PhotoCard.vue';
import { getPhotos, searchPhotos } from '@/api/photo';
import type { Blog } from '@/types';
import { addPhotoAttrs } from '@/utils/funcUtils';

const searchQuery = ref('');
const loading = ref(false);
const photos = ref<Blog[]>([]);
const current = ref(1);
const pageSize = ref(12);
const total = ref(0);
const hasMore = ref(false);

// const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

const fetchPhotos = async () => {
  loading.value = true;
  try {
    const res = await getPhotos({ current: current.value, size: pageSize.value });
    if (res.success) {
      photos.value = res.data.records;
      total.value = res.data.pagination.total;

      addPhotoAttrs(photos.value);
    }
  } catch (error) {
    console.error('获取照片列表失败:', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    current.value = 1;
    fetchPhotos();
    return;
  }
  loading.value = true;
  try {
    const res = await searchPhotos(searchQuery.value, { current: current.value, size: pageSize.value });
    if (res.success) {
      photos.value = res.data.records;
      total.value = res.data.pagination.total;
    }
  } catch (error) {
    console.error('搜索照片失败:', error);
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  current.value = page;
  if (searchQuery.value.trim()) {
    handleSearch();
  } else {
    fetchPhotos();
  }
};

onMounted(() => {
  fetchPhotos();
});
</script>

<style lang="scss" scoped>
.photos-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;

  .content-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;

      .section-title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin: 0;
      }

      .search-input {
        width: 280px;
      }
    }
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .photo-skeleton {
      height: 250px;
      border-radius: 8px;
    }
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;

    .page-info {
      font-size: 14px;
      color: #999;
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #999;

    .empty-icon {
      font-size: 60px;
      margin-bottom: 20px;
    }

    .empty-text {
      font-size: 16px;
    }
  }
}
</style>
