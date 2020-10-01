<template>
  <div class="text-subtitle-2">
    {{ title }}
    <div v-if="type === 'input'">
      <v-text-field
        v-model="dataInput[title.toLowerCase]"
        :type="inputtype"
        color="#00793a"
        dense
        outlined
        clearable
        :placeholder="title"
        @change="valueinput(dataInput[title.toLowerCase])"
      />
    </div>
    <div v-if="type === 'select'">
      <v-autocomplete
        v-model="dataInput[title.toLowerCase]"
        :items="listoptions"
        color="#00793a"
        dense
        outlined
        clearable
        :placeholder="title"
        @change="valueinput(dataInput[title.toLowerCase])"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardFilter',
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    listoptions: {
      type: Array,
      default: () => []
    },
    valueinput: {
      type: Function,
      default: () => ''
    },
    inputtype: {
      type: String,
      default: 'text'
    }
  },
  data: () => ({
    dataInput: {}
  })
}
</script>

<style>

</style>
