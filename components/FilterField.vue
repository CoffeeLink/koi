<template>
  <v-card
    class="mx-auto"
    outlined
    color="#ecede9"
    tile
  >
    <v-card-title
      class="text-subtitle-1-lg font-weigth-bold card-title-style"
    >
      Filter
    </v-card-title>
    <v-divider />
    <FilterKomoditas
      :komoditasinput="(input) => mappingInputfilter('komoditas', input)"
    />
    <v-divider />
    <FilterPrice
      :priceinput="(input) => mappingInputfilter('price', input)"
    />
    <v-divider />
    <FilterLocations
      :porvinsiinput="(input) => mappingInputfilter('area_provinsi', input)"
      :kotainput="(input) => mappingInputfilter('area_kota', input)"
      :optionprovinsi="listprovinces"
      :optionkota="listcitys"
    />
    <v-divider />
    <FilterSize
      :optionsize="listsizes"
      :sizeinput="(input) => mappingInputfilter('size', input)"
    />
  </v-card>
</template>

<script>
import FilterKomoditas from './FilterKomoditas'
import FilterLocations from './FilterLocations'
import FilterPrice from './FilterPrice'
import FilterSize from './FilterSize'

export default {
  name: 'FilterField',
  components: {
    FilterKomoditas,
    FilterPrice,
    FilterLocations,
    FilterSize
  },
  props: {
    inputfilter: {
      type: Function,
      default: () => ''
    },
    listcitys: {
      type: Array,
      default: () => []
    },
    listprovinces: {
      type: Array,
      default: () => []
    },
    listsizes: {
      type: Array,
      default: () => []
    },
    clickfilter: {
      type: Function,
      default: () => ''
    },
    clickclear: {
      type: Function,
      default: () => ''
    }
  },
  data: () => ({
    objectFilter: {}
  }),
  methods: {
    mappingInputfilter (type, data) {
      this.objectFilter[type] = data
      this.inputfilter({ ...this.objectFilter })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-title-style {
background-color: #00793a;
font-size: 1rem;
color: white;
padding: 12px !important;
}
</style>
