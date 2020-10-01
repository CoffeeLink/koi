<template>
  <v-container>
    <CardFilter
      title="Provinsi"
      type="select"
      :listoptions="optionprovinsi"
      :valueinput="(input) => porvinsiinput(input)"
    />
    <CardFilter
      title="Kota"
      type="select"
      :listoptions="optionkota"
      :valueinput="(input) => kotainput(input)"
    />
  </v-container>
</template>

<script>
import CardFilter from './CardFilter'

export default {
  components: {
    CardFilter
  },
  props: {
    porvinsiinput: {
      type: Function,
      default: () => ''
    },
    kotainput: {
      type: Function,
      default: () => ''
    },
    optionprovinsi: {
      type: Array,
      default: () => []
    },
    optionkota: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
