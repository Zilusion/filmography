import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CategoryView from '../views/CategoryView.vue';
import MovieDetailView from '../views/MovieDetailView.vue';
import { createWebHashHistory } from 'vue-router';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/category/:categorySlug',
			name: 'category',
			component: CategoryView,
			props: true,
		},
		{
			path: '/movie/:movieId',
			name: 'movieDetail',
			component: MovieDetailView,
			props: true,
		},
	],
});

export default router;
