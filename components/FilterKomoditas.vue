<template>
  <v-container>
    <CardFilter
      title="Komoditas"
      type="input"
      :valueinput="(input) => komoditasinput(input)"
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
    komoditasinput: {
      type: Function,
      default: () => ''
    }
  }
}
</script>

<style>

</style>
