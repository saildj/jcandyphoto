<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover" class="album-card" @click="handleClick">
    <div class="album-cover">
      <img :src="album.coverUrl || defaultCover" class="image" />
      <div class="album-overlay">
        <span class="photo-count">{{ album.photoCount }} 张照片</span>
      </div>
    </div>
    <div style="padding: 14px;">
      <span class="album-name">{{ album.name }}</span>
      <p class="album-description">{{ album.description || defaultDesc}}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Album } from '@/types';

const props = defineProps<{
  album: Album;
  flag: string;
}>();

const router = useRouter();
const defaultCover = 'https://picsum.photos/400/300?random=album';
const defaultDesc = '暂无描述';

const handleClick = () => {
  router.push({path: `/albums/${props.album.id}`, query: { flag: props.flag }});
};
</script>

<style lang="scss" scoped>
.album-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);

    .album-cover {
      .image {
        transform: scale(1.08);
      }

      .hover-overlay {
        opacity: 1;
      }
    }
  }

  .album-cover {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .album-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);
      padding: 20px 16px 16px;
      color: #fff;

      .photo-count-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 500;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }

    .hover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;

      .view-icon {
        font-size: 48px;
        color: #fff;
        animation: pulse 2s infinite;
      }

      .view-text {
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1px;
      }
    }
  }

  .album-info {
    padding: 18px 16px;
  }

  .album-name {
    font-size: 17px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 8px 0;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .album-description {
    font-size: 13px;
    color: #8c8c8c;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    line-height: 1.5;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
