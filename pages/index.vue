<template>
  <v-container>
    <v-row>
      <v-col class="col-sm-3 col-md-3 col-xl-2">
        <FilterField
          :inputfilter="(filter) => setInput(filter)"
          :listcitys="allCitys"
          :listprovinces="allProvinces"
          :listsizes="allSizes"
        />
      </v-col>
      <v-col class="col-sm-9 col-md-9 col-xl-10">
        <v-row
          class="d-flex justify-end"
          style="background-color: #00793a;"
        >
          <v-col>
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#ecede9"
                  v-bind="attrs"
                  style="color: #00793a;"
                  tile
                  v-on="on"
                >
                  Tambah Ikan
                </v-btn>
              </template>
              <v-card color="#f5f5f5">
                <AddList
                  :save="(data) => saveNewFish(data)"
                  :cancel="closeDialog"
                  :listsize="allSizes"
                  :listprovinsi="allProvinces"
                  :listkota="allProvWithCity"
                />
              </v-card>
            </v-dialog>
          </v-col>
          <v-col
            class="text-subtitle-1 font-weigth-bold col-md-1"
            style="font-size: 1rem; color: white;"
          >
            Urutkan
          </v-col>
          <v-col class="pa-2 col-md-4">
            <v-select
              v-model="sort"
              :items="sortItems"
              dense
              solo
              tile
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
    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      :color="snackbarData.color"
      top
      right
      style="color: white;"
    >
      {{ snackbarData.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import { mapGetters, mapActions } from 'vuex'

import Cards from '../components/Cards'
import FilterField from '../components/FilterField'
import AddList from '../components/AddList'

export default {
  components: {
    Cards,
    FilterField,
    AddList
  },
  data: () => ({
    snackbarData: {},
    snackbar: true,
    dialog: false,
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
    'stateLoading',
    'allProvWithCity'
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
      'sortingFish',
      'postNewFish'
    ]),
    setInput (data) {
      this.sort = ''
      this.filterFish({ ...data })
    },
    saveNewFish (data) {
      const postData = { ...data }
      postData.uuid = uuidv4()
      postData.timestamp = Date.now().toString()
      postData.tgl_parsed = new Date(Date.now()).toISOString()

      this.postNewFish(postData)
        .then((resp) => {
          this.dialog = false
          this.snackbar = true
          this.snackbarData = {
            color: '#00d667',
            text: resp
          }
        })
        .catch((err) => {
          this.dialog = false
          this.snackbar = true
          this.snackbarData = {
            color: '#e8005d',
            text: err
          }
        })
    },
    closeDialog () {
      this.dialog = false
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
