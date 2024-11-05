<script setup>
import {ref} from 'vue'
import {defineEmits} from 'vue';
import {formatDate} from "@/utils";

import SelectComponent from "@/components/SelectComponent.vue";

const headers = [
  {title: 'Имя', key: 'name', sortable: false},
  {title: 'Дата загрузки', key: 'created_at', sortable: false},
  {title: 'Статус', key: 'parsing_status', sortable: false},
  {title: 'Действия', key: 'actions', sortable: false},
]

defineProps({
  documents: {
    type: Array,
    default: []
  }
});

const selectValues = [
  {
    id: "1",
    name: "Запустить"
  },
  {
    id: "2",
    name: "Удалить"
  }
]

const selectedValue = ref(null);
const selected = ref([])
const emit = defineEmits(['deleteDoc', 'runDoc']);


function getColor(parsing_status) {
  if (parsing_status === "completed") {
    return "green"
  } else if (parsing_status === "not_started") {
    return "primary"
  } else return ""
}


function handleSelectChange(e) {
  if (e === "1") {
    emit('runDoc', selected.value);
    selectedValue.value = null;
    selected.value = [];

  } else if (e === "2") {
    emit('deleteDoc', selected.value);
    selectedValue.value = null;
    selected.value = [];
  }
}


</script>

<template>
  <v-card
    elevation="0"
    width="70vw"
    color="transparent"
  >

    <SelectComponent
      class="w-25 mx-2 my-2"
      v-model="selectedValue"
      :items="selectValues"
      :disabled="!selected.length"
      @update:model-value="handleSelectChange"
    />

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="documents"
      item-value="id"
      show-select
      class="bg-transparent"
    >
      <template v-slot:item.created_at="{ value }">
        {{ formatDate(value) }}
      </template>

      <template v-slot:item.parsing_status="{ value }">
        <v-chip :color="getColor(value)">
          {{ value }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon="mdi-play-circle-outline"
          density="compact"
          elevation="0"
          @click="emit('runDoc', [item.id])"
        />
        <v-btn
          icon="mdi-delete-outline"
          density="compact"
          elevation="0"
          @click="emit('deleteDoc', [item.id])"
        />

      </template>
      <template v-slot:no-data>
        <span>Файлы не загружены</span>
      </template>
    </v-data-table>


  </v-card>


</template>

<style scoped lang="scss">

</style>
