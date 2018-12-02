<template>
  <div>
    {{test}}
    <button @click="testFun()">改变</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['test'])
  },
  methods: {
    ...mapMutations(['testFun'])
  }
}
</script>

<style scoped>
* {
  font-size: 0.3rem;
}
</style>