<script setup>
import { useTheme } from 'vuetify'


const emit = defineEmits(['update:drawer']);
const theme = useTheme()

defineProps(['drawer']);

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>

<template>
  <v-app-bar :elevation="0">
    <v-app-bar-nav-icon v-if="drawer!==true" @click="emit('update:drawer', !drawer)"></v-app-bar-nav-icon>
    <v-btn v-if="drawer!==true" density="default" icon="mdi-square-edit-outline"
           elevation="0"/>
    <v-app-bar-title>GPT</v-app-bar-title>


    <v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
    <v-avatar class="mx-6" color="primary">Т</v-avatar>
  </v-app-bar>
</template>

<style scoped lang="scss">

</style>
