<script setup>
import {ref} from 'vue';
import NavigationDrawer from "@/layouts/components/NavigationDrawer.vue";
import AppBar from "@/layouts/components/AppBar.vue";


const selected_kb = ref(null);
const drawer = ref(true);


</script>

<template>
  <v-app id="inspire">
    <NavigationDrawer :drawer="drawer" @update:drawer="(e) => drawer = e" @select="(e) => selected_kb = e"/>

    <AppBar :drawer="drawer" @update:drawer="(e) => drawer = e"/>

    <v-main>

      <slot name="content"/>

      <v-footer app>
        <slot name="footer"/>
      </v-footer>


    </v-main>
  </v-app>
</template>


<style lang="scss" scoped>

</style>
