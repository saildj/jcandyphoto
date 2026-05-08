import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'photo/:id',
        name: 'PhotoDetail',
        component: () => import('@/views/PhotoDetail.vue'),
      },
    ],
  },
  {
    path: '/photos',
    name: 'Photos',
    component: () => import('@/views/Photos.vue'),
  },
  {
    path: '/albums',
    children: [
      {
        path: '',
        name: 'Albums',
        component: () => import('@/views/Albums.vue'),
      },
      {
        path: ':id',
        name: 'AlbumDetail',
        component: () => import('@/views/AlbumDetail.vue'),
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
