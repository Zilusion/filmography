<template>
	<v-container v-if="movie">
	  <v-row>
		<v-col cols="12" md="4">
		  <v-img
			:src="movie.poster"
			:alt="`Постер ${movie.title}`"
			max-height="600"
			contain
		  >
		   <template v-slot:placeholder>
			  <v-row class="fill-height ma-0" align="center" justify="center">
				<v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
			  </v-row>
			</template>
		  </v-img>
		</v-col>
		<v-col cols="12" md="8">
		  <h1 class="text-h3 mb-2">{{ movie.title }} ({{ movie.year }})</h1>
		  
		  <div class="d-flex align-center mb-4">
			<v-rating
			  :model-value="movie.rating / 2"
			  color="amber"
			  density="compact"
			  half-increments
			  readonly
			  size="large"
			></v-rating>
			<span class="text-h6 ml-2">({{ movie.rating }}/10)</span>
		  </div>
  
		  <p class="text-subtitle-1 mb-1"><strong>Режиссер:</strong> {{ movie.director }}</p>
		  <p class="text-subtitle-1 mb-1"><strong>Длительность:</strong> {{ movie.duration }}</p>
		  
		  <div class="my-3">
			<strong>Жанры:</strong>
			<v-chip
			  v-for="genreName in genreNames"
			  :key="genreName"
			  class="ma-1"
			  color="primary"
			  label
			  small
			>
			  {{ genreName }}
			</v-chip>
		  </div>
  
		  <h2 class="text-h5 mt-6 mb-2">Описание</h2>
		  <p class="text-body-1">{{ movie.description }}</p>
  
		  <h2 class="text-h5 mt-6 mb-2">В ролях</h2>
		  <v-list density="compact">
			<v-list-item v-for="(actor, index) in movie.cast" :key="index">
			  <v-list-item-title>{{ actor }}</v-list-item-title>
			</v-list-item>
		  </v-list>
  
		  <v-btn color="secondary" @click="$router.back()" class="mt-6">
			<v-icon start icon="mdi-arrow-left"></v-icon>
			Назад
		  </v-btn>
		</v-col>
	  </v-row>
	</v-container>
	<v-alert v-else type="error" class="ma-5">
	  Фильм не найден.
	</v-alert>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMovieStore } from '@/stores/movieStore';
  
  const route = useRoute();
  const movieStore = useMovieStore();
  
  const movieId = computed(() => route.params.movieId);
  const movie = computed(() => movieStore.getMovieById(movieId.value));
  
  const genreNames = computed(() => {
	if (movie.value && movie.value.genreIds) {
	  return movieStore.getGenreNamesByIds(movie.value.genreIds);
	}
	return [];
  });
  </script>
  
  <style scoped>
  </style>