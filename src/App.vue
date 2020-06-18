<template>
  <div id="app">
    <h1>hello world</h1>
    <button @click="success">success</button>
    <button @click="warning">warning</button>
    <button @click="danger">danger</button>
    <button @click="primary">primary</button>
    <button @click="show = true">show</button>
    <vant-notify v-model="show">
      hello world
    </vant-notify>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: true,
    }
  },
  methods: {
    success() {
      this.$notify({ type: 'success', message: 'SUCCESS', duration: 1000 })
    },
    warning() {
      this.$notify({ type: 'warning', message: 'WARNING', duration: 1000 })
    },
    danger() {
      this.$notify({ type: 'danger', message: 'DANGER', duration: 1000 })
    },
    primary() {
      this.$notify({ type: 'primary', message: 'PRIMARY', duration: 1000 })
    },
  },
}
</script>