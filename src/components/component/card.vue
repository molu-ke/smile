<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
   created () {
     console.log("有执行吗-------------")
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
