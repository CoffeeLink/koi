<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-card
        color="#ecede9"
        v-bind="attrs"
        class="mx-auto"
        max-width="190"
        hover
        outlined
        v-on="on"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1 mb-1 font-weight-bold">
              {{ komoditas ? komoditas : '-' }}
            </v-list-item-title>
            <div class="text-md-subtitle-2 font-weight-bold" style="color: #00793a;">
              Rp. {{ harga ? harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '-' }}
            </div>
            <div class="subtitle-2">
              Ukuran:
              <span class="overline">
                {{ size ? size : '-' }}
              </span>
            </div>
            <v-divider />
            <v-list-item-subtitle class="caption mb-1 text-capitalize">
              <br>
              Prov: {{ provinsi ? provinsi : '-' }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="caption mb-1">
              Kota: {{ kota ? kota : '-' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </template>
    <span>{{ komoditas ? komoditas : '-' }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'Card',
  props: {
    komoditas: {
      type: String,
      default: ''
    },
    harga: {
      type: Number,
      default: null
    },
    size: {
      type: Number,
      default: null
    },
    provinsi: {
      type: String,
      default: ''
    },
    kota: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
