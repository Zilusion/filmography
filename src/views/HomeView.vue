<template>
  <v-container fluid class="pa-md-6 pa-sm-4 pa-xs-2">
    <v-sheet rounded="xl" class="pa-5 pa-md-8 mb-10" elevation="3">
      <div class="d-flex align-center mb-6">
        <v-icon color="primary" size="x-large" left class="mr-3">mdi-view-dashboard-outline</v-icon>
        <h1 class="text-h4 font-weight-bold">Категории фильмов</h1>
      </div>
      <v-row dense>
        <v-col
          v-for="category in categories"
          :key="category.id"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :to="{ name: 'category', params: { categorySlug: category.slug } }"
              :color="isHovering ? 'primary' : 'secondary'"
              :class="{ 'on-hover': isHovering }"
              class="category-card d-flex flex-column align-center justify-center text-center pa-3"
              flat
              rounded="lg"
              height="120"
            >
              <v-icon size="36" class="mb-2" :color="isHovering ? 'white' : 'primary-lighten-1'">
                {{ getCategoryIcon(category.slug) }}
              </v-icon>
              <span class="text-subtitle-1 font-weight-medium" :class="{'white--text': isHovering}">
                {{ category.name }}
              </span>
            </v-card>
          </v-hover>
        </v-col>
        <v-col v-if="!categories.length" cols="12">
          <v-alert type="info" variant="tonal">Категории пока не добавлены.</v-alert>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet rounded="xl" class="pa-5 pa-md-8" elevation="3" v-if="randomMovie">
      <div class="d-flex align-center mb-6">
         <v-icon color="accent" size="x-large" left class="mr-3">mdi-movie-roll</v-icon>
        <h2 class="text-h4 font-weight-bold">Фильм дня</h2>
      </div>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="5" xl="4">
          <MovieCard :movie="randomMovie" />
          <div class="text-center mt-6">
            <v-btn
              color="accent"
              size="large"
              rounded="lg"
              elevation="2"
              :to="{ name: 'movieDetail', params: { movieId: randomMovie.id } }"
            >
              <v-icon left class="mr-2">mdi-play-circle-outline</v-icon>
              Смотреть подробнее
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
    <v-alert v-else type="info" class="mt-8" elevation="2" variant="tonal">
      Фильмы не найдены, чтобы показать случайный.
    </v-alert>

  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import MovieCard from '@/components/MovieCard.vue';

const movieStore = useMovieStore();

const categories = computed(() => movieStore.categories);
const randomMovie = computed(() => movieStore.getRandomMovie);

const getCategoryIcon = (slug) => {
  const icons = {
    'sci-fi': 'mdi-rocket-launch-outline',
    'action': 'mdi-flash-alert-outline',
    'drama': 'mdi-drama-masks',
    'crime': 'mdi-gavel',
    'thriller': 'mdi-knife',
    'animation': 'mdi-palette-outline',
    'fantasy': 'mdi-magic-staff',
    'romance': 'mdi-heart-multiple-outline',
    'comedy': 'mdi-emoticon-happy-outline',
    'horror': 'mdi-skull-crossbones-outline'
  };
  return icons[slug] || 'mdi-tag-outline';
};
</script>

<style scoped>
.category-card {
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.category-card.on-hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10) !important;
}

.category-card .text-subtitle-1 {
  line-height: 1.3;
}
</style>