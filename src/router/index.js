import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Home' }
      },
      {
        path: '/blog/:id',
        name: 'blog',
        component: () => import('@/views/BlogView/Index.vue'),
        meta: { title: 'Blog' }
      },
      {
        path: '/blogs/:id',
        name: 'blogs',
        component: () => import('@/views/BlogView/Select.vue'),
        meta: { title: 'Blogs' }
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/CategoryView/Index.vue'),
        meta: { title: 'Categories' }
      },
      {
        path: '/category/:id(.*)*',
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
        path: '/tag/:id(.*)*',
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
        path: '/archive/:id(.*)*',
        name: 'archive-select',
        component: () => import('@/views/ArchiveView/Select.vue'),
        meta: { title: 'Archive' }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: { title: 'About' }
      },
      {
        path: ':match(.*)*',
        name: 'error',
        component: () => import('@/views/Error.vue'),
        meta: { title: 'Error' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
