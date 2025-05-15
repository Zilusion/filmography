<template>
	<v-card
	  class="mx-auto movie-card"
	  max-width="300"
	  hover
	  @click="navigateToMovie"
	>
	  <v-img
		:src="movie.poster"
		height="450px"
		cover
		:alt="`Постер фильма ${movie.title}`"
	  >
		<template v-slot:placeholder>
		  <v-row class="fill-height ma-0" align="center" justify="center">
			<v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
		  </v-row>
		</template>
	  </v-img>
  
	  <v-card-title class="text-subtitle-1">
		{{ movie.title }}
	  </v-card-title>
  
	  <v-card-subtitle>
		{{ movie.year }}
		<v-rating
		  v-if="movie.rating"
		  :model-value="movie.rating / 2"
		  color="amber"
		  density="compact"
		  half-increments
		  readonly
		  size="small"
		  class="ml-2"
		></v-rating>
	  </v-card-subtitle>
	</v-card>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const props = defineProps({
	movie: {
	  type: Object,
	  required: true
	}
  });
  
  const router = useRouter();
  
  const navigateToMovie = () => {
	router.push({ name: 'movieDetail', params: { movieId: props.movie.id } });
  };
  </script>
  
  <style scoped>
  .movie-card {
	cursor: pointer;
	transition: transform 0.2s ease-in-out;
  }
  .movie-card:hover {
	transform: scale(1.03);
  }
  </style>