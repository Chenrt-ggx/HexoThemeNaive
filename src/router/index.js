import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/CategoryView/Index.vue'),
    meta: { title: 'Categories' }
  },
  {
    path: '/category/:id',
    name: 'category-select',
    component: () => import('@/views/CategoryView/Select.vue'),
    meta: { title: 'Category' }
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import('@/views/TagView/Index.vue'),
    meta: { title: 'Tags' }
  },
  {
    path: '/tag/:id',
    name: 'tag-select',
    component: () => import('@/views/TagView/Select.vue'),
    meta: { title: 'Tag' }
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('@/views/ArchiveView/Index.vue'),
    meta: { title: 'Archive' }
  },
  {
    path: '/archive/:id',
    name: 'archive-select',
    component: () => import('@/views/ArchiveView/Select.vue'),
    meta: { title: 'Archive' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: { title: 'About' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
