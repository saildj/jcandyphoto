<!-- /home/wireman/nodejs/jCandyPhoto/src/components/common/AlbumPhotoItem.vue -->
<template>
  <div class="album-photo-item" @click="handleClick">
    <div class="photo-wrapper">
      <img :src="photo.url" class="photo-image" @load="onImageLoad" />
      <div class="photo-overlay">
        <el-icon class="view-icon"><View /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { View } from '@element-plus/icons-vue';
import type { Photo } from '@/types';

const props = defineProps<{
  photo: Photo;
}>();

const emit = defineEmits<{
  (e: 'click', photo: Photo): void;
}>();

const handleClick = () => {
  emit('click', props.photo);
};

const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.opacity = '1';
};
</script>

<style lang="scss" scoped>
.album-photo-item {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    .photo-overlay {
      opacity: 1;
    }

    .photo-image {
      transform: scale(1.06);
    }
  }

  .photo-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 3;  /* 关键：固定 4:3 比例 */

    .photo-image {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;  /* 裁剪填充 */
      opacity: 0;
      transition: opacity 0.5s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .photo-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;

      .view-icon {
        font-size: 40px;
        color: #fff;
        animation: pulse 2s infinite;
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}
</style>