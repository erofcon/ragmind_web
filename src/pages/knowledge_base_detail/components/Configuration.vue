<script>
export default {
  name: "Configuration"
}
</script>


<template>
  <v-container>

    <v-row align-content="start" class="w-50">
      <v-col cols="auto" class="px-0 mx-0">
        <v-icon
          icon="mdi-asterisk"
          color="red"
          class="text-subtitle-1"
        />
      </v-col>
      <v-col cols="auto" class="px-0">
        Название базы знаний
      </v-col>
      <v-col cols="12" class="px-0 py-0">
        <v-text-field
          density="compact"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row align-content="start" class=" w-50">
      <v-col cols="auto" class="px-0 mx-0">
        Описание
      </v-col>
      <v-col cols="12" class="px-0 py-0">
        <v-text-field
          density="compact"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row align-content="start" class="w-50">
      <v-col cols="auto" class="px-0 mx-0">
        Колличество символов в чанке
      </v-col>
      <v-col cols="auto" class="px-0 mx-0 cursor-help">
        <v-tooltip
          max-width="300"
          location="top"
          text="Он приблизительно определяет колличество символов в фрагменте.">
          <template v-slot:activator="{ props }">
            <v-icon
              icon="mdi-information-outline"
              size="sm"
              v-bind="props"
            />
          </template>
        </v-tooltip>
      </v-col>
      <v-col cols="12" class="py-0 px-0 mx-0">
        <v-slider
          thumb-label
          max-width="50%"
        />
      </v-col>
    </v-row>

    <v-row align-content="start" class="w-50">
      <v-col cols="auto" class="px-0 mx-0">
        <v-icon
          icon="mdi-asterisk"
          color="red"
          class="text-subtitle-1"
        />
      </v-col>
      <v-col cols="auto" class="px-0">
        Разделитель
      </v-col>
      <v-col cols="12" class="px-0 py-0">
        <v-text-field
          density="compact"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row align-content="start" class="w-50">
      <v-col cols="auto" class="px-0 mx-0">
        Колличество перекрытии в чанке
      </v-col>
      <v-col cols="auto" class="px-0 mx-0 cursor-help">
        <v-tooltip
          max-width="300"
          location="top"
          text="Он приблизительно определяет колличество символов в фрагменте.">
          <template v-slot:activator="{ props }">
            <v-icon
              icon="mdi-information-outline"
              size="sm"
              v-bind="props"
            />
          </template>
        </v-tooltip>
      </v-col>
      <v-col cols="12" class="py-0 px-0 mx-0">
        <v-slider
          thumb-label
          max-width="50%"
        />
      </v-col>
    </v-row>

    <v-row align-content="start" class="w-50">
      <v-col cols="auto" class="px-0 mx-0">
        <v-btn
          color="primary"
          variant="flat"
          block
          text="Сохранить"
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<style scoped lang="scss">

</style>
