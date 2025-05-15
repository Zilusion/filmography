<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer;">
        Фильмотека
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Главная</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Моя Фильмотека</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
</script>

<style>
</style>