<template>
  <v-container>
    <CardFilter
      title="Harga"
      type="input"
      inputtype="number"
      :valueinput="(input) => priceinput(input)"
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
    priceinput: {
      type: Function,
      default: () => ''
    }
  }
}
</script>

<style>

</style>
