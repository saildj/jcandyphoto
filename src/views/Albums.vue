<template>
  <div class="albums-page">
    <div class="content-section">
      <div class="section-header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="section-title">相册集</h1>
            <div class="search-box">
              <el-input
                v-model="searchText"
                placeholder="搜索相册..."
                :prefix-icon="Search"
                clearable
                @input="handleSearch"
              />
            </div>
          </div>
          <div class="view-toggle">
            <button 
              class="toggle-btn" 
              :class="{ active: viewMode === 'tag' }"
              @click="handleViewModeChange('tag')"
            >
              <el-icon><Tickets /></el-icon>
              标签相册
            </button>
            <button 
              class="toggle-btn" 
              :class="{ active: viewMode === 'category' }"
              @click="handleViewModeChange('category')"
            >
              <el-icon><Collection /></el-icon>
              分类相册
            </button>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="album-grid">
        <AlbumSkeleton />
      </div>

      <div v-else-if="albums.length > 0" class="album-grid">
        <AlbumCard v-for="album in albums" :key="album.id" :album="album" :flag="viewMode" />
      </div>

      <div v-else class="empty-state">
        <el-icon class="empty-icon"><FolderOpened /></el-icon>
        <p class="empty-text">暂无作品集</p>
      </div>

      <div v-if="total > pageSize" class="pagination-wrapper">
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="current"
          @current-change="handlePageChange"
        /> -->
        <!-- 分页控件 -->
        <Paging
          :current="current"
          :total="total"
          :page-size="pageSize"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FolderOpened, Tickets, Collection, Search } from '@element-plus/icons-vue';
import AlbumCard from '@/components/common/AlbumCard.vue';
import AlbumSkeleton from '@/components/core/AlbumSkeleton.vue'
import Paging from '@/components/page/Paging.vue'
import { getAlbums } from '@/api/album';
import type { Album } from '@/types';
import useLoading from '@/composables/useLoading';

const allAlbums = ref<Album[]>([]);
const albums = ref<Album[]>([]);
const current = ref(1);
const pageSize = ref(10);
const total = ref(0);
const viewMode = ref<string>('tag');
const searchText = ref('');
const {
  isLoading,
  startLoading,
  stopLoading,
} = useLoading();

const fetchAlbums = async () => {
  startLoading();

  try {
    const res = await getAlbums({ 
      current: current.value, 
      size: pageSize.value, 
      flag: viewMode.value 
    });
    
    if (res.success) {
      allAlbums.value = res.data.records;
      filterAlbums();
      total.value = res.data.pagination.total;
    }
  } catch (error) {
    console.error('获取作品集列表失败:', error);
  } finally {
    stopLoading();
  }
};

const filterAlbums = () => {
  if (!searchText.value.trim()) {
    albums.value = allAlbums.value;
    return;
  }
  const searchLower = searchText.value.toLowerCase();
  albums.value = allAlbums.value.filter(album => 
    album.name?.toLowerCase().includes(searchLower) || 
    album.description?.toLowerCase().includes(searchLower)
  );
};

const handleSearch = () => {
  filterAlbums();
};

const handleViewModeChange = (val: string) => {
  if (viewMode.value === val) return;
  viewMode.value = val;
  current.value = 1;
  fetchAlbums();
};

const handlePageChange = (page: number) => {
  current.value = page;
  fetchAlbums();
};

onMounted(() => {
  fetchAlbums();
});
</script>

<style lang="scss" scoped>
.albums-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px 20px;

  .content-section {
    background-color: #fff;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .section-header {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .section-title {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, #059669, #047857);
            border-radius: 2px;
          }
        }

        .search-box {
          width: 280px;

          :deep(.el-input__wrapper) {
            padding: 8px 16px;
            border-radius: 24px;
            background: #f5f7fa;
            box-shadow: none;
            transition: all 0.3s ease;

            &:hover {
              background: #eef2f7;
            }

            &.is-focus {
              background: #fff;
              box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2);
            }
          }

          :deep(.el-input__inner) {
            color: #333;
            font-size: 14px;
          }

          :deep(.el-input__prefix) {
            color: #999;
          }
        }

        .view-toggle {
          display: flex;
          gap: 8px;
          padding: 4px;
          background: #f5f7fa;
          border-radius: 12px;

          .toggle-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 20px;
            border: none;
            background: transparent;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 500;
            color: #666;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover:not(.active) {
              color: #059669;
              background: rgba(5, 150, 105, 0.05);
            }

            &.active {
              background: #fff;
              color: #059669;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            }

            .el-icon {
              font-size: 18px;
            }
          }
        }
      }
    }
  }

  .album-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 30px;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
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

@media (max-width: 768px) {
  .albums-page {
    padding: 16px;

    .content-section {
      padding: 20px;

      .section-header {
        .header-content {
          flex-direction: column;
          align-items: stretch;

          .section-title {
            font-size: 22px;
            text-align: center;
            
            &::after {
              left: 50%;
              transform: translateX(-50%);
            }
          }

          .view-toggle {
            justify-content: center;
          }
        }
      }
    }

    .album-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
  }
}
</style>