<template>
  <div class="about-page">
    <div class="about-card">
      <div class="about-header">
        <div class="header-left">
          <div class="avatar-icon">📚</div>
          <div class="header-info">
            <h1 class="name">{{ author.name }}</h1>
            <p class="title">{{ author.work }}</p>
          </div>
        </div>
      </div>

      <div class="divider-line"></div>

      <div class="quote-section">
        <p class="quote">{{ author.slogan }}</p>
      </div>

      <p class="description">
        {{ author.detailedBio }}
      </p>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon">📍</div>
          <div class="info-content">
            <h3>栖居</h3>
            <p>{{ author.location }}</p>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">📸</div>
          <div class="info-content">
            <h3>爱好</h3>
            <p>
              <template v-for="(item, index) in author.interests" :key="index">
                {{ item }}
                <el-divider v-if="index !== author.interests.length - 1" 
                  direction="vertical" class="hobby-divider" />
              </template>
            </p>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">�</div>
          <div class="info-content">
            <h3>书信</h3>
            <p>{{ author.email }}</p>
          </div>
        </div>
      </div>

      <div class="divider-line-thin"></div>

      <div class="footer-section">
        <div class="social-icons">
          <div class="social-icon">
            <span class="icon-text">
              <FaIcon :icon="faGithub" />
            </span>
          </div>
          <div class="social-icon">
            <span class="icon-text">
              <FaIcon :icon="faQq" />
            </span>
          </div>
          <div class="social-icon">
            <span class="icon-text">
              <FaIcon :icon="faWeibo" />
            </span>
          </div>
        </div>
        <div class="signature">
          <span>✍️ 手写回信，见字如晤</span>
        </div>
      </div>

      <div class="bottom-quote">
        <p>🌿“在数字时代，保留一份手工的真诚”</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/user';
import { useLoading } from '@/composables/useLoading';
import { User, UserProfile } from '@/types';
import { 
  faGithub, 
  // faTwitter,
  // faFacebook,
  faWeibo,
  faQq
} from '@fortawesome/free-brands-svg-icons'
import { onMounted, ref } from 'vue';

const {
  // isLoading, 
  startLoading, 
  stopLoading 
} = useLoading();

const author = ref<UserProfile>({
  name: '解点迷',
  work: '独立创作者 & 全栈设计师',
  slogan: '“ 写作是思想的散步，设计是理性的浪漫。”',
  shortBio: "写过代码，拍过山川，现在用文字与设计搭建数字花园。相信好的故事能跨越边界，连接真实的人。",
  detailedBio: "前软件工程师，现自由内容创作者。在互联网行业浮沉5年后，决定用更温柔的方式探索技术与人文的交叉点。目前专注于个人知识库、独立博客写作及UI设计。喜爱咖啡、胶片摄影和周末徒步。",
  location: "中国 · 杭州",
  interests: ['旅行', '看书', '手冲咖啡', '解放鞋'],
  email: "hello@linyian.com",
  funFact: "从0到1搭建过3个独立项目，最近沉迷于用Tailwind CSS与Figma做设计系统。"
});

const getUserProfile = async () => {
  startLoading();

  try {
    const res = await getUserInfo({ id: 10});
    if (res.success) {
      const user: User = res.data;
      if (user) {
        author.value.name = user.nickname;
      }
    }
  } catch (error) {
    console.error('获取用户信息失败：', error);
  } finally {
    stopLoading();
  }
}

onMounted(async () => {
  getUserProfile();
});

</script>

<style lang="scss" scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  .about-card {
    background-color: var(--bg-card);
    border-radius: 24px;
    padding: 30px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }

  .about-header {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    .header-left {
      display: flex;
      align-items: center;
      gap: 20px;

      .avatar-icon {
        width: 64px;
        height: 64px;
        background: #b98a63;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
      }

      .header-info {
        .name {
          font-size: 36px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .title {
          font-size: 16px;
          color: #666;
          margin: 0;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  .divider-line {
    height: 2px;
    border: none;
    border-top: 2px solid #d4c4a8;
    margin: 24px 0;
  }

  .divider-line-thin {
    height: 1px;
    background: #e8dcc8;
    margin: 32px 0;
    border: none;
  }

  .quote-section {
    margin: 32px 0;
    padding-left: 12px;
    border-left: 4px solid #b98a63;

    .quote {
      font-size: 20px;
      color: #5e4b3c;
      margin: 0;
      font-style: italic;
    }
  }

  .description {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    margin: 24px 0;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin: 32px 0;

    .info-item {
      display: flex;
      gap: 12px;

      .info-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .info-content {
        h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 4px 0;
        }

        p {
          font-size: 15px;
          color: #555;
          margin: 0;
          line-height: 1.6;
        }

        .hobby-divider {
          height: 10px; 
          border-left-color: #b98a63; 
          opacity: 0.4;
        }
      }
    }
  }

  .footer-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0;

    .social-icons {
      display: flex;
      gap: 16px;

      .social-icon {
        width: 40px;
        height: 40px;
        background: #e8dcc8;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #d4c4a8;
        }

        .icon-text {
          font-size: 18px;
        }
      }
    }

    .signature {
      font-size: 14px;
      color: #888;
      font-style: italic;
    }
  }

  .bottom-quote {
    background: #f7eed9;
    border-radius: 24px;
    padding: 16px 24px;
    text-align: center;
    margin-top: 24px;

    p {
      font-size: 15px;
      color: #666;
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .about-page {
    padding: 20px 16px;

    .about-card {
      padding: 32px 24px;
    }

    .about-header {
      .header-left {
        flex-direction: column;
        text-align: center;

        .header-info {
          .name {
            font-size: 28px;
          }
        }
      }
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .footer-section {
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>
