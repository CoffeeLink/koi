<template>
  <v-container>
    <v-card
      class="mx-auto"
      outlined
      color="#ecede9"
    >
      <br>
      <v-card-title
        class="text-subtitle-1-lg font-weigth-bold"
      >
        Menambahkan Data Ikan
      </v-card-title>
      <br>
      <br>

      <v-container>
        <v-row>
          <v-col cols="2" class="form-title">
            Komoditas
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="newData.komoditas"
              color="#00793a"
              dense
              outlined
              clearable
              placeholder="Komoditas"
              required
            />
          </v-col>
          <v-col>
            <div v-if="errorAlert.komoditas">
              <v-alert
                dense
                outlined
                type="error"
              >
                {{ errorAlert.komoditas }}
              </v-alert>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="form-title">
            Harga
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="newData.price"
              type="number"
              color="#00793a"
              dense
              outlined
              clearable
              placeholder="Harga"
              required
            />
          </v-col>
          <v-col>
            <div v-if="errorAlert.price">
              <v-alert
                dense
                outlined
                type="error"
              >
                {{ errorAlert.price }}
              </v-alert>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="form-title">
            Ukuran
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              v-model="newData.size"
              :items="listsize"
              color="#00793a"
              dense
              outlined
              clearable
              placeholder="Ukuran"
              required
            />
          </v-col>
          <v-col>
            <div v-if="errorAlert.size">
              <v-alert
                dense
                outlined
                type="error"
              >
                {{ errorAlert.size }}
              </v-alert>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="form-title">
            Provinsi
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              v-model="newData.area_provinsi"
              :items="listprovinsi"
              color="#00793a"
              dense
              outlined
              clearable
              placeholder="Provinsi"
              required
            />
          </v-col>
          <v-col>
            <div v-if="errorAlert.area_provinsi">
              <v-alert
                dense
                outlined
                type="error"
              >
                {{ errorAlert.area_provinsi }}
              </v-alert>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="form-title">
            Kota
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              v-model="newData.area_kota"
              :items="listkota[newData.area_provinsi]"
              hint="Pilih provinsi terlebih dahulu untuk mendapatkan daftar kota"
              color="#00793a"
              dense
              outlined
              clearable
              placeholder="Kota"
              persistent-hint
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container class="d-flex justify-end">
        <v-btn
          style="margin-right: 5px; color: white;"
          color="#00793a"
          tile
          @click="saveAndValidate"
        >
          Simpan
        </v-btn>
        <v-btn
          tile
          style="margin-right: 5px; color: white;"
          color="red"
          @click="cancelAdd"
        >
          Batal
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'AddList',
  props: {
    save: {
      type: Function,
      default: () => ''
    },
    cancel: {
      type: Function,
      default: () => ''
    },
    listsize: {
      type: Array,
      default: () => []
    },
    listprovinsi: {
      type: Array,
      default: () => []
    },
    listkota: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    newData: {},
    errorAlert: {}
  }),
  methods: {
    saveAndValidate () {
      const textError = 'Mohon untuk mengisi form '
      const validateKey = ['komoditas', 'price', 'area_provinsi', 'size']
      for (let i = 0; i < validateKey.length; i++) {
        if (!this.newData[validateKey[i]]) {
          this.errorAlert[validateKey[i]] = textError + (validateKey[i] === 'price' ? 'harga' : validateKey[i] === 'size' ? 'ukuran' : 'provinsi')
        }
      }
      if (Object.keys(this.errorAlert).length > 0) {
        this.$forceUpdate()
      } else {
        const postData = { ...this.newData }
        this.save(postData)
        this.newData = {}
        this.errorAlert = {}
      }
    },
    cancelAdd () {
      this.newData = {}
      this.errorAlert = {}
      this.cancel()
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-title {
    text-align: right;
    font-weight: 600;
  }
</style>
