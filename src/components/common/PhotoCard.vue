<template>
  <div class="photo-card" @click="handleClick">
    <div class="card-image-wrapper">
      <img :src="photo.cover.url" :alt="photo.title" class="card-image" />
    </div>
    <div class="card-content">
      <div class="card-meta">
        <span class="meta-item">
          <span class="meta-icon">📅</span>
          {{ formatDate(photo.date) }}
        </span>
        <span class="meta-item" v-if="photo.category">
          <span class="meta-icon">🏝️</span>
          {{ photo.category.name }}
        </span>
      </div>
      <h3 class="card-title">{{ photo.title }}</h3>
      <p class="card-description">{{ photo.summary }}</p>
      <div class="card-footer">
        <span class="read-more">继续阅读 →</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Blog } from '@/types';
import dayjs from 'dayjs';

const props = defineProps<{
  photo: Blog;
}>();

const router = useRouter();

const formatDate = (date: string) => {
  return dayjs(date).format('YYYY年MM月DD日');
};

const handleClick = () => {
  router.push(`/photo/${props.photo.id}`);
};
</script>

<style lang="scss" scoped>
.photo-card {
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);

    .card-image {
      transform: scale(1.05);
    }

    .read-more {
      color: #e67e22;
    }
  }

  .card-image-wrapper {
    position: relative;
    height: 350px;
    overflow: hidden;

    @media (max-width: 600px) {
      height: 250px;
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }
  }

  .card-content {
    padding: 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .card-meta {
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

    .card-title {
      font-size: 22px;
      font-weight: 600;
      color: #333;
      margin: 0 0 15px 0;
      line-height: 1.4;
    }

    .card-description {
      display: -webkit-box;
      margin: 0 0 20px 0;
      font-size: 15px;
      color: #666;
      line-height: 1.6;
      line-clamp: 3; /* 标准属性，提升兼容性 */
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;     
    }

    .card-footer {
      margin-top: auto;
      
      .read-more {
        font-size: 15px;
        color: #d35400;
        font-weight: 500;
        transition: color 0.2s;
      }
    }
  }
}
</style>
