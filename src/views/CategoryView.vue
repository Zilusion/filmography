<template>
	<div>
	  <h1 class="text-h4 mb-6" v-if="category">
		Категория: {{ category.name }}
	  </h1>
	  <v-alert v-else type="warning">
		Категория не найдена.
	  </v-alert>
  
	  <v-row v-if="moviesInCategory.length > 0">
		<v-col
		  v-for="movie in moviesInCategory"
		  :key="movie.id"
		  cols="12" sm="6" md="4" lg="3"
		  class="d-flex align-stretch"
		>
		  <MovieCard :movie="movie" class="flex-grow-1"/>
		</v-col>
	  </v-row>
	  <v-alert v-else-if="category" type="info" class="mt-4">
		В этой категории пока нет фильмов.
	  </v-alert>
	</div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMovieStore } from '@/stores/movieStore';
  import MovieCard from '@/components/MovieCard.vue';
  
  const route = useRoute();
  const movieStore = useMovieStore();
  
  const categorySlug = computed(() => route.params.categorySlug);
  
  const category = computed(() => {
	return movieStore.getCategoryBySlug(categorySlug.value);
  });
  
  const moviesInCategory = computed(() => {
	if (category.value) {
	  return movieStore.getMoviesByCategoryId(category.value.id);
	}
	return [];
  });
  </script>