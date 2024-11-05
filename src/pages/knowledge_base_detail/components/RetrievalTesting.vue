<script>
export default {
  name: "RetrievalTesting"
}
</script>


<template>
  <v-container>
    <v-row
      class="mx-0 px-0"
    >
      <v-col
        cols="auto"
      >
        <v-card
          elevation="0"
          color="transparent"
        >


          <v-row align-content="start" class="px-2">
            <v-col cols="auto" class="">
              Similarity threshold
            </v-col>
            <v-col cols="auto" class="px-0 mx-0 cursor-help">
              <v-tooltip
                max-width="300"
                location="top"
                text="Мы используем гибридную оценку сходства для оценки расстояния между двумя строками текста.
                      Это взвешенное сходство ключевых слов и сходство векторного косинуса.
                      Если сходство между запросом и фрагментом меньше этого порога, фрагмент будет отфильтрован.">
                <template v-slot:activator="{ props }">
                  <v-icon
                    icon="mdi-information-outline"
                    size="sm"
                    v-bind="props"
                  />
                </template>
              </v-tooltip>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-slider
                thumb-label
              />
            </v-col>
          </v-row>

          <v-row align-content="start" class="px-2">
            <v-col cols="auto" class="">
              Top K
            </v-col>
            <v-col cols="auto" class="px-0 mx-0 cursor-help">
              <v-tooltip
                max-width="300"
                location="top"
                text="Мы используем гибридную оценку сходства для оценки расстояния между двумя строками текста.
                      Это взвешенное сходство ключевых слов и сходство векторного косинуса.
                      Если сходство между запросом и фрагментом меньше этого порога, фрагмент будет отфильтрован.">
                <template v-slot:activator="{ props }">
                  <v-icon
                    icon="mdi-information-outline"
                    size="sm"
                    v-bind="props"
                  />
                </template>
              </v-tooltip>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-slider
                thumb-label
              />
            </v-col>
          </v-row>

          <v-row align-content="start" class="px-2">
            <v-col cols="auto" class="">
              User Rerank model
            </v-col>
            <v-col cols="auto" class="px-0 mx-0 cursor-help">
              <v-tooltip
                max-width="300"
                location="top"
                text="Он использует встраивания запроса и фрагментов для вычисления сходства векторного косинуса.
                В противном случае вместо векторного косинусного сходства используется оценка переранга.">
                <template v-slot:activator="{ props }">
                  <v-icon
                    icon="mdi-information-outline"
                    size="sm"
                    v-bind="props"
                  />
                </template>
              </v-tooltip>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-switch
                color="primary"
                hide-details
              ></v-switch>
            </v-col>
          </v-row>


          <v-row align-content="start" class="px-2">
            <v-col cols="auto" class="">
              Текст
            </v-col>
            <v-col cols="12" class="py-0">
              <v-textarea
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row align-content="start" class="px-2">
            <v-col cols="auto" class="">
              <v-btn
                color="primary"
                variant="flat"
                block
                text="Testing"
              />
            </v-col>
          </v-row>

        </v-card>
      </v-col>
      <v-col
        cols="auto"
      >
        <v-data-iterator/>

      </v-col>
    </v-row>


  </v-container>
</template>

<style scoped lang="scss">

</style>
