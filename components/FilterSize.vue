<template>
  <v-container>
    <CardFilter
      title="Ukuran"
      type="select"
      :listoptions="optionsize"
      :valueinput="(input) => sizeinput(input)"
    />
  </v-container>
</template>

<script>
import CardFilter from './CardFilter'

export default {
  name: 'FilterSize',
  components: {
    CardFilter
  },
  props: {
    sizeinput: {
      type: Function,
      default: () => ''
    },
    optionsize: {
      type: Array,
      default: () => ''
    }
  }
}
</script>

<style>

</style>
