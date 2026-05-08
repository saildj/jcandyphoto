<template>
  <div class="featured-post" @click="handleFeatured">
    <div class="post-image-wrapper">
      <img :src="featuredPhoto.thumbnailUrl || featuredPhoto.url" :alt="featuredPhoto.title" class="post-image" />
    </div>
    <div class="post-content">
      <div class="post-meta">
        <span class="meta-item">
          <span class="meta-icon">📅</span>
          {{ formatDate(featuredPhoto.date) }}
        </span>
        <span class="meta-item" v-if="featuredPhoto.category">
          <span class="meta-icon">🏝️</span>
          {{ featuredPhoto.category?.name }}
        </span>
      </div>
      <h2 class="post-title">{{ featuredPhoto.title }}</h2>
      <p class="post-description">{{ featuredPhoto.summary }}</p>
      <div class="post-actions">
        <span class="read-more">继续阅读 →</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { getFeaturedPhoto } from '@/api/photo';
import type { Blog, Photo } from '@/types';
import { addPhotoAttrs, randomRecord } from '@/utils/funcUtils';
import { ElMessage } from 'element-plus';

interface FeaturedPhotoDisplay extends Blog {
  url: string;
  thumbnailUrl: string;
  // width: number;
  // height: number;
  // size: number;
  // mimetype: string;
}

const router = useRouter();

const featuredPhoto = ref<FeaturedPhotoDisplay>({
  id: 0,
  title: '光影日记',
  date: '',
  category: { id: 0, name: '精选', photos: 0 }, // 默认分类
  content: '用镜头记录生活与旅行，每一张照片背后都有一个故事。',
  summary: '用镜头记录生活与旅行，每一张照片背后都有一个故事。',
  url: 'https://picsum.photos/1200/600?random=featured',
  thumbnailUrl: '',
  // width: 0,
  // height: 0,
  // size: 0,
  // mimetype: '',
  // albumId: 0,
  tags: [],
  views: 0,
  likes: [],
  createdAt: '',
  updatedAt: '',
  coverImage: '',
  coverThumbnail: '',
  cover: {} as Photo,
});

const handleFeatured = () => {
  const id = featuredPhoto.value.id
  if (id !== 0) {
    router.push(`/photo/${id}`);
  }
}

const formatDate = (date: string) => {
  if (!date) return '2025年12月30日';
  return dayjs(date).format('YYYY年MM月DD日');
};

const fetchFeatured = async () => {
  try {
    const res = await getFeaturedPhoto();
    if (res.success && res.data && res.data.records.length > 0) {
      const records = res.data.records;

      addPhotoAttrs(records);

      // 从数组中随机获取一条记录
      const record = randomRecord(records);
      
      featuredPhoto.value = {
        ...record,
        url: record.coverImage,
        thumbnailUrl: record.coverThumbnail,
      };
    }
  } catch (error) {
    console.error('获取精选图片失败:', error);
    ElMessage.warning('获取精选图片失败');
  }
};

onMounted(() => {
  fetchFeatured();
});
</script>

<style lang="scss" scoped>
.featured-post {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);

    .read-more {
      color: #e67e22;
    }
  }

  .post-image-wrapper {
    width: 100%;
    height: 450px;
    overflow: hidden;

    .post-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s;
    }
  }

  .post-content {
    padding: 30px;
    display: flex;
    flex-direction: column;

    .post-meta {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 12px;
      font-size: 14px;
      color: #888;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .meta-icon {
        font-size: 16px;
      }
    }

    .post-title {
      font-size: 28px;
      font-weight: 600;
      color: #333;
      margin: 0 0 15px 0;
      line-height: 1.4;
    }

    .post-description {
      font-size: 16px;
      color: #666;
      line-height: 1.8;
      margin: 0 0 25px 0;
    }

    .post-actions {
      .read-more {
        font-size: 16px;
        color: #d35400;
        font-weight: 500;
        transition: color 0.2s;
      }
    }
  }
}
</style>
