<template>
  <v-container>
    <div v-if="loading">
      <v-row>
        <v-col
          v-for="(numb, index) in 12"
          :key="numb+index"
          cols="3"
        >
          <v-skeleton-loader
            class="mx-auto"
            max-width="190"
            max-height="150"
            type="card"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col
          v-for="(ind, index) in datas"
          :key="index"
          cols="3"
        >
          <Card
            :komoditas="ind.komoditas"
            :harga="ind.price"
            :size="ind.size"
            :provinsi="ind.area_provinsi"
            :kota="ind.area_kota"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Card from './Card'
export default {
  components: {
    Card
  },
  props: {
    datas: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>

</style>
