<template>
  <div class="album-detail-page">
    <el-button @click="goBack" :icon="ArrowLeft" class="back-button">返回</el-button>

    <div v-if="isLoading" class="loading-state">
      <el-skeleton animated />
    </div>

    <div v-else-if="album" class="album-content">
      <div class="album-header">
        <img :src="album.coverUrl || defaultCover" class="album-cover" />
        <div class="album-info">
          <h1 class="album-name">{{ album.name }}</h1>
          <p class="album-description">{{ album.description }}</p>
          <p class="album-stats">{{ album.photoCount }} 张照片</p>
        </div>
      </div>

      <div class="photo-grid">
        <AlbumPhotoItem 
          v-for="photo in photos" 
          :key="photo.id" 
          :photo="photo" 
          @click="handlePhotoClick" 
        />
      </div>

      <el-pagination
        v-if="total > 0"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="current"
        @current-change="handlePageChange"
      />
    </div>

    <div v-if="selectedPhoto" class="photo-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">×</button>
        <img :src="selectedPhoto.url" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import AlbumPhotoItem from '@/components/common/AlbumPhotoItem.vue';
import { getAlbumById } from '@/api/album';
import type { Album, Photo } from '@/types';
import useLoading from '@/composables/useLoading';

const route = useRoute();
const router = useRouter();
// const loading = ref(false);
const album = ref<Album | null>(null);
const photos = ref<Photo[]>([]);
const current = ref(1);
const pageSize = ref(12);
const total = ref(0);
const selectedPhoto = ref<Photo | null>(null);
const defaultCover = 'https://picsum.photos/400/300?random=album';
const {
  // state,
  isLoading, 
  // isLoadingMore, 
  // isLoadingPage,
  startLoading, 
  stopLoading 
} = useLoading();
let flag: string | undefined = ''

const goBack = () => router.back();

const fetchAlbumDetail = async () => {
  // loading.value = true;
  startLoading();

  try {
    const res = await getAlbumById(Number(route.params.id),
    { current: current.value, size: pageSize.value, flag });
    if (res.success) {
      album.value = res.data.album;
      photos.value = res.data.album.photos || [];
    }
  } catch (error) {
    console.error('获取相册详情失败:', error);
  } finally {
    // loading.value = false;
    stopLoading();
  }
};

const handlePhotoClick = (photo: Photo) => {
  selectedPhoto.value = photo;
};

const closeModal = () => {
  selectedPhoto.value = null;
};

const handlePageChange = (page: number) => {
  current.value = page;
};

onMounted(() => {
  flag = route.query.flag as string;
  fetchAlbumDetail();
});
</script>

<style lang="scss" scoped>
.album-detail-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;

  .back-button {
    margin-bottom: 20px;
    border: none;
    background: #fff;
    color: #333;
    padding: 10px 20px;
    border-radius: 24px;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      background: #f5f5f5;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }
  }

  .album-content {
    .album-header {
      display: flex;
      gap: 30px;
      background: #fff;
      padding: 30px;
      border-radius: 16px;
      margin-bottom: 30px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .album-cover {
        width: 300px;
        height: 220px;
        object-fit: cover;
        border-radius: 12px;
        flex-shrink: 0;

        @media (max-width: 768px) {
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 3;
        }
      }

      .album-info {
        flex: 1;

        .album-name {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #1a1a1a;
        }

        .album-description {
          font-size: 16px;
          color: #666;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .album-stats {
          font-size: 15px;
          color: #999;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #f5f7fa;
          border-radius: 20px;
        }
      }
    }

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 40px;

      @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 12px;
      }
    }
  }

  .photo-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;

    .modal-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      animation: slideUp 0.3s ease;

      .close-btn {
        position: absolute;
        top: -50px;
        right: 0;
        background: transparent;
        border: none;
        color: #fff;
        font-size: 40px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.2);
        }
      }

      img {
        max-width: 100%;
        max-height: 85vh;
        object-fit: contain;
        border-radius: 8px;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
