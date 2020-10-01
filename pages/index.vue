<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <FilterField
          :inputfilter="(filter) => setInput(filter)"
          :listcitys="allCitys"
          :listprovinces="allProvinces"
          :listsizes="allSizes"
        />
      </v-col>
      <v-col cols="9">
        <v-row class="d-flex justify-end" style="background-color: #00793a;">
          <v-col cols="1" class="text-subtitle-1 font-weigth-bold" style="font-size: 1rem; color: white;">
            Urutkan
          </v-col>
          <v-col class="pa-2" cols="4">
            <v-select
              v-model="sort"
              :items="sortItems"
              dense
              solo
              hide-details
              clearable
              @change="sortingFish(sort)"
            />
          </v-col>
        </v-row>
        <v-row>
          <Cards
            :datas="allFishes"
            :loading="stateLoading"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cards from '../components/Cards'
import FilterField from '../components/FilterField'

export default {
  components: {
    Cards,
    FilterField
  },
  data: () => ({
    listCity: [],
    listProvince: [],
    listSizes: [],
    sortItems: [
      'Harga Tertinggi',
      'Harga Terendah',
      'Ukuran Terbesar',
      'Ukuran Terkecil'
    ],
    sort: ''
  }),
  computed: mapGetters([
    'allFishes',
    'allCitys',
    'allProvinces',
    'allSizes',
    'stateLoading'
  ]),
  created () {
    this.fetchFishes()
    this.fetchSizes()
    this.fetchArea()
  },
  methods: {
    ...mapActions([
      'fetchFishes',
      'fetchArea',
      'fetchSizes',
      'filterFish',
      'sortingFish'
    ]),
    setInput (data) {
      this.sort = ''
      this.filterFish({ ...data })
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-banner {
    .v-banner__wrapper {
      border-bottom: none
    }
  }

</style>
